import jsPDF from 'jspdf';
import type { Meeting } from "../types/meeting.ts"

const PRIORITY_LABELS: Record<string, string> = {
    urgent_important: 'Urgent & Important',
    important_not_urgent: 'Important, Not Urgent',
    urgent_not_important: 'Urgent, Not Important',
    low_priority: 'Low Priority',
};

const STATUS_LABELS: Record<string, string> = {
    to_do: 'To Do',
    in_progress: 'In Progress',
    done: 'Done',
    completed: 'Completed',
    pending: 'Pending',
};

export function exportMeetingToPDF(meeting: Meeting): void {
    const doc = new jsPDF({ unit: 'mm', format: 'a4' });
    const pageW = doc.internal.pageSize.getWidth();
    const pageH = doc.internal.pageSize.getHeight();
    const marginL = 18;
    const marginR = 18;
    const contentW = pageW - marginL - marginR;
    let y = 0;

    const checkPage = (needed = 10) => {
        if (y + needed > pageH - 16) {
            doc.addPage();
            y = 20;
        }
    };

    const drawWrappedText = (
        text: string,
        x: number,
        maxWidth: number,
        lineHeight: number,
    ): number => {
        const lines = doc.splitTextToSize(text, maxWidth);
        lines.forEach((line: string) => {
            checkPage(lineHeight + 2);
            doc.text(line, x, y);
            y += lineHeight;
        });
        return y;
    };

    const sectionHeading = (title: string) => {
        checkPage(14);
        y += 4;
        doc.setFillColor(79, 70, 229);
        doc.rect(marginL, y - 4, 3, 7, 'F');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(11);
        doc.setTextColor(30, 30, 40);
        doc.text(title, marginL + 6, y);
        y += 6;
        doc.setDrawColor(220, 220, 230);
        doc.setLineWidth(0.3);
        doc.line(marginL, y, pageW - marginR, y);
        y += 5;
    };

    // HEADER
    doc.setFillColor(79, 70, 229);
    doc.rect(0, 0, pageW, 36, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    const titleLines = doc.splitTextToSize(meeting.title, contentW - 10);
    doc.text(titleLines, marginL, 14);
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(199, 210, 254);
    const dateStr = new Date(meeting.date).toLocaleDateString('en-US', {
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    });
    doc.text(dateStr, marginL, 14 + titleLines.length * 7 + 2);
    y = 44;

    // SUMMARY
    sectionHeading('Meeting Summary');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9.5);
    doc.setTextColor(55, 55, 70);
    drawWrappedText(meeting.summary, marginL, contentW, 5.5);
    y += 4;

    // KEY TOPICS
    if (meeting.key_topics?.length) {
        sectionHeading('Key Topics');
        doc.setFontSize(9);
        let tagX = marginL;
        const tagH = 6.5;
        const tagPad = 3;
        meeting.key_topics.forEach((topic) => {
            const tw = doc.getTextWidth(topic) + tagPad * 2 + 2;
            if (tagX + tw > pageW - marginR) {
                tagX = marginL;
                y += tagH + 3;
                checkPage(tagH + 5);
            }
            doc.setFillColor(238, 242, 255);
            doc.setDrawColor(165, 180, 252);
            doc.setLineWidth(0.3);
            doc.roundedRect(tagX, y - 4.5, tw, tagH, 1.5, 1.5, 'FD');
            doc.setTextColor(67, 56, 202);
            doc.setFont('helvetica', 'normal');
            doc.text(topic, tagX + tagPad + 1, y);
            tagX += tw + 3;
        });
        y += tagH + 3;
    }

    // ACTION ITEMS
    if (meeting.action_items?.length) {
        sectionHeading(`Action Items (${meeting.action_items.length})`);
        meeting.action_items.forEach((item, i) => {
            checkPage(22);
            const rowH = Math.max(
                18,
                doc.splitTextToSize(item.description, contentW - 40).length * 5.5 + 10,
            );
            doc.setFillColor(i % 2 === 0 ? 249 : 255, i % 2 === 0 ? 250 : 255, i % 2 === 0 ? 251 : 255);
            doc.setDrawColor(229, 231, 235);
            doc.setLineWidth(0.25);
            doc.roundedRect(marginL, y, contentW, rowH, 2, 2, 'FD');
            const priorityColors: Record<string, [number, number, number]> = {
                urgent_important: [79, 70, 229],
                important_not_urgent: [13, 148, 136],
                urgent_not_important: [245, 158, 11],
                low_priority: [156, 163, 175],
            };
            const [pr, pg, pb] = priorityColors[item.priority] ?? [156, 163, 175];
            doc.setFillColor(pr, pg, pb);
            doc.roundedRect(marginL + 3, y + 3, 2.5, rowH - 6, 1, 1, 'F');
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(9);
            doc.setTextColor(30, 30, 40);
            const descLines = doc.splitTextToSize(item.description, contentW - 44);
            descLines.forEach((line: string, li: number) => {
                doc.text(line, marginL + 9, y + 7 + li * 5.5);
            });
            const metaY = y + 7 + descLines.length * 5.5;
            doc.setFontSize(8);
            doc.setTextColor(107, 114, 128);
            doc.text(`${item.assignee_name}`, marginL + 9, metaY);
            const priorityLabel = PRIORITY_LABELS[item.priority] ?? item.priority;
            doc.setTextColor(pr, pg, pb);
            doc.text(`· ${priorityLabel}`, marginL + 9 + doc.getTextWidth(item.assignee_name) + 2, metaY);
            const statusLabel = STATUS_LABELS[item.status] ?? item.status;
            const stW = doc.getTextWidth(statusLabel) + 6;
            doc.setFillColor(238, 242, 255);
            doc.roundedRect(pageW - marginR - stW - 2, y + (rowH / 2) - 3.5, stW + 2, 7, 1.5, 1.5, 'F');
            doc.setTextColor(67, 56, 202);
            doc.setFontSize(7.5);
            doc.text(statusLabel, pageW - marginR - stW + 1, y + (rowH / 2) + 1);
            y += rowH + 3;
        });
    }

    // EISENHOWER MATRIX
    if (meeting.action_items?.length) {
        checkPage(20);
        sectionHeading('Eisenhower Priority Matrix');
        const LANES = [
            { key: 'urgent_important', label: 'Do Now', sub: 'Urgent & Important', color: [79, 70, 229] as [number, number, number] },
            { key: 'important_not_urgent', label: 'Schedule', sub: 'Important, Not Urgent', color: [13, 148, 136] as [number, number, number] },
            { key: 'urgent_not_important', label: 'Delegate', sub: 'Urgent, Not Important', color: [245, 158, 11] as [number, number, number] },
            { key: 'low_priority', label: 'Defer', sub: 'Low Priority', color: [156, 163, 175] as [number, number, number] },
        ];
        const colW = contentW / 4 - 2;

        // ── pre-calculate each column's total height ──────────────────────────
        const colHeights = LANES.map((lane) => {
            const items = meeting.action_items.filter(a => a.priority === lane.key);
            if (items.length === 0) return 13 + 11; // header + empty card
            return 13 + items.reduce((sum, item) => {
                const lines = doc.splitTextToSize(item.description, colW - 8);
                return sum + lines.length * 4.5 + 10 + 2.5;
            }, 0);
        });
        const matrixH = Math.max(...colHeights);
        checkPage(matrixH + 10);

        const matrixStartY = y;

        LANES.forEach((lane, li) => {
            const laneItems = meeting.action_items.filter(a => a.priority === lane.key);
            const laneX = marginL + li * (colW + 2.5);

            // Header
            const [r, g, b] = lane.color;
            doc.setFillColor(r, g, b);
            doc.roundedRect(laneX, matrixStartY, colW, 10, 2, 2, 'F');
            doc.setFont('helvetica', 'bold');
            doc.setFontSize(8);
            doc.setTextColor(255, 255, 255);
            doc.text(lane.label, laneX + 3, matrixStartY + 4.5);
            doc.setFont('helvetica', 'normal');
            doc.setFontSize(6.5);
            doc.setTextColor(220, 220, 255);
            doc.text(lane.sub, laneX + 3, matrixStartY + 8.5);

            let itemY = matrixStartY + 13;

            if (laneItems.length === 0) {
                doc.setFillColor(248, 248, 252);
                doc.setDrawColor(220, 220, 230);
                doc.setLineWidth(0.2);
                doc.roundedRect(laneX, itemY, colW, 8, 1.5, 1.5, 'FD');
                doc.setFont('helvetica', 'italic');
                doc.setFontSize(7);
                doc.setTextColor(180, 180, 190);
                doc.text('No items', laneX + 3, itemY + 5);
            } else {
                laneItems.forEach((item) => {
                    const descW = colW - 8; // tighter wrap width
                    const lines = doc.splitTextToSize(item.description, descW);
                    const cardH = lines.length * 4.5 + 10;

                    doc.setFillColor(255, 255, 255);
                    doc.setDrawColor(220, 220, 230);
                    doc.setLineWidth(0.2);
                    doc.roundedRect(laneX, itemY, colW, cardH, 1.5, 1.5, 'FD');

                    doc.setFont('helvetica', 'normal');
                    doc.setFontSize(7.5);
                    doc.setTextColor(40, 40, 60);
                    lines.forEach((line: string, li2: number) => {
                        doc.text(line, laneX + 3, itemY + 5.5 + li2 * 4.5);
                    });

                    doc.setFontSize(6.5);
                    doc.setTextColor(130, 130, 145);
                    doc.text(item.assignee_name, laneX + 3, itemY + cardH - 2.5);

                    itemY += cardH + 2.5;
                });
            }
        });

        y = matrixStartY + matrixH + 6;
    }

    // TRANSCRIPT
    if (meeting.transcript) {
        checkPage(20);
        sectionHeading('Full Transcript');
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(8.5);
        doc.setTextColor(70, 70, 85);
        drawWrappedText(meeting.transcript, marginL, contentW, 5);
    }

    // FOOTER
    const totalPages = (doc.internal as any).getNumberOfPages();
    for (let p = 1; p <= totalPages; p++) {
        doc.setPage(p);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(160, 160, 175);
        doc.text(
            `${meeting.title} · Generated ${new Date().toLocaleDateString()}`,
            marginL,
            pageH - 8,
        );
        doc.text(`${p} / ${totalPages}`, pageW - marginR, pageH - 8, { align: 'right' });
        doc.setDrawColor(220, 220, 230);
        doc.setLineWidth(0.2);
        doc.line(marginL, pageH - 12, pageW - marginR, pageH - 12);
    }

    const safeName = meeting.title.replace(/[^a-z0-9]/gi, '_').toLowerCase();
    doc.save(`${safeName}_report.pdf`);
}
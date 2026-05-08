import { jsPDF } from "jspdf";

import { CvModel, ReportModel } from "@/shared/types/assessment";

const page = {
  width: 210,
  height: 297,
  margin: 16,
};

const colors = {
  slate950: [15, 23, 42] as const,
  slate700: [51, 65, 85] as const,
  slate500: [100, 116, 139] as const,
  slate100: [241, 245, 249] as const,
  emerald600: [5, 150, 105] as const,
  emerald100: [209, 250, 229] as const,
  amber50: [255, 251, 235] as const,
  amber800: [146, 64, 14] as const,
  white: [255, 255, 255] as const,
};

export async function exportReportToPdf(report: ReportModel, filename: string) {
  const pdf = createPdf();
  let y = await drawHero(pdf, "ORIENTA", report.title, report.subtitle);

  y = drawPersonalData(pdf, report.personalData, y + 8);

  for (const section of report.sections) {
    y = ensureSpace(pdf, y, 34);
    y = drawSectionTitle(pdf, section.title, y);

    if (section.body) {
      y = drawParagraph(pdf, section.body, y + 2);
    }

    if (section.items) {
      for (const item of section.items) {
        y = drawBulletCard(pdf, item, y + 3);
      }
    }

    y += 5;
  }

  y = ensureSpace(pdf, y, 36);
  pdf.setFillColor(...colors.amber50);
  pdf.roundedRect(page.margin, y, contentWidth(), 28, 4, 4, "F");
  pdf.setTextColor(...colors.amber800);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(10);
  pdf.text("Aclaracion importante", page.margin + 5, y + 8);
  pdf.setFont("helvetica", "normal");
  drawWrappedText(pdf, report.disclaimer, page.margin + 5, y + 15, contentWidth() - 10, 5);

  pdf.save(filename);
}

export function exportCvToPdf(cv: CvModel, filename: string) {
  const pdf = createPdf();

  pdf.setFillColor(...colors.slate950);
  pdf.rect(0, 0, 58, page.height, "F");
  pdf.setFillColor(...colors.emerald600);
  pdf.roundedRect(14, 18, 30, 30, 6, 6, "F");
  pdf.setTextColor(...colors.white);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(18);
  pdf.text("O", 25, 38);

  pdf.setFontSize(9);
  pdf.text("ORIENTA", 14, 65);
  pdf.setFont("helvetica", "normal");
  pdf.setTextColor(203, 213, 225);
  drawWrappedText(pdf, "CV base generado desde el recorrido vocacional.", 14, 74, 34, 5);

  let y = 28;
  const x = 72;
  const width = page.width - x - page.margin;

  pdf.setTextColor(...colors.slate950);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(26);
  y = drawWrappedText(pdf, cv.name, x, y, width, 10);

  pdf.setTextColor(...colors.emerald600);
  pdf.setFontSize(12);
  pdf.text(cv.headline, x, y + 4);
  y += 15;

  pdf.setTextColor(...colors.slate500);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  y = drawWrappedText(pdf, cv.educationLine, x, y, width, 5) + 8;

  y = drawCvSection(pdf, "Perfil", cv.profile, x, y, width);
  y += 7;

  pdf.setTextColor(...colors.slate950);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text("Fortalezas destacadas", x, y);
  y += 6;

  for (const strength of cv.strengths) {
    pdf.setFillColor(...colors.slate100);
    pdf.roundedRect(x, y, width, 13, 4, 4, "F");
    pdf.setTextColor(...colors.slate700);
    pdf.setFont("helvetica", "normal");
    pdf.setFontSize(10);
    pdf.text(strength, x + 4, y + 8);
    y += 17;
  }

  y += 6;
  pdf.setFillColor(...colors.emerald100);
  pdf.roundedRect(x, y, width, 28, 5, 5, "F");
  pdf.setTextColor(...colors.slate700);
  pdf.setFontSize(9);
  drawWrappedText(
    pdf,
    "Este CV es una base inicial. Puede servirte para ordenar tu presentacion y seguir ajustandola con acompanamiento profesional.",
    x + 5,
    y + 9,
    width - 10,
    5,
  );

  pdf.save(filename);
}

function createPdf() {
  return new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });
}

async function drawHero(pdf: jsPDF, eyebrow: string, title: string, subtitle: string) {
  pdf.setFillColor(...colors.slate950);
  pdf.rect(0, 0, page.width, 48, "F");

  const logo = await loadImageDataUrl(`${import.meta.env.BASE_URL}favicon.png`);

  if (logo) {
    pdf.setFillColor(...colors.white);
    pdf.roundedRect(page.margin, 11, 14, 14, 3, 3, "F");
    pdf.addImage(logo, "PNG", page.margin + 1.8, 12.8, 10.4, 10.4, undefined, "FAST");
  }

  pdf.setTextColor(...colors.emerald100);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(9);
  pdf.text(eyebrow, page.margin + 18, 16);
  pdf.setTextColor(...colors.white);
  pdf.setFontSize(24);
  pdf.text(title, page.margin + 18, 29);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(11);
  pdf.text(subtitle, page.margin + 18, 39);

  return 56;
}

function drawPersonalData(pdf: jsPDF, data: ReportModel["personalData"], y: number) {
  const gap = 4;
  const cardWidth = (contentWidth() - gap) / 2;
  let currentY = y;

  data.forEach((item, index) => {
    const column = index % 2;
    const x = page.margin + column * (cardWidth + gap);

    if (index > 0 && column === 0) {
      currentY += 20;
    }

    pdf.setFillColor(...colors.slate100);
    pdf.roundedRect(x, currentY, cardWidth, 16, 3, 3, "F");
    pdf.setTextColor(...colors.slate500);
    pdf.setFont("helvetica", "bold");
    pdf.setFontSize(7);
    pdf.text(item.label.toUpperCase(), x + 4, currentY + 6);
    pdf.setTextColor(...colors.slate950);
    pdf.setFontSize(9);
    pdf.text(item.value, x + 4, currentY + 12);
  });

  return currentY + 24;
}

function drawSectionTitle(pdf: jsPDF, title: string, y: number) {
  pdf.setTextColor(...colors.slate950);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(15);
  pdf.text(title, page.margin, y);
  return y + 6;
}

function drawParagraph(pdf: jsPDF, text: string, y: number) {
  pdf.setTextColor(...colors.slate700);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  return drawWrappedText(pdf, text, page.margin, y, contentWidth(), 5);
}

function drawBulletCard(pdf: jsPDF, text: string, y: number) {
  const lines = pdf.splitTextToSize(text, contentWidth() - 10) as string[];
  const height = Math.max(14, lines.length * 5 + 8);
  y = ensureSpace(pdf, y, height + 4);

  pdf.setFillColor(...colors.slate100);
  pdf.roundedRect(page.margin, y, contentWidth(), height, 4, 4, "F");
  pdf.setTextColor(...colors.slate700);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  pdf.text(lines, page.margin + 5, y + 8);

  return y + height;
}

function drawCvSection(pdf: jsPDF, title: string, body: string, x: number, y: number, width: number) {
  pdf.setTextColor(...colors.slate950);
  pdf.setFont("helvetica", "bold");
  pdf.setFontSize(11);
  pdf.text(title, x, y);
  pdf.setTextColor(...colors.slate700);
  pdf.setFont("helvetica", "normal");
  pdf.setFontSize(10);
  return drawWrappedText(pdf, body, x, y + 8, width, 5);
}

function drawWrappedText(
  pdf: jsPDF,
  text: string,
  x: number,
  y: number,
  width: number,
  lineHeight: number,
) {
  const lines = pdf.splitTextToSize(text, width) as string[];
  pdf.text(lines, x, y);
  return y + lines.length * lineHeight;
}

function ensureSpace(pdf: jsPDF, y: number, needed: number) {
  if (y + needed <= page.height - page.margin) {
    return y;
  }

  pdf.addPage();
  return page.margin;
}

function contentWidth() {
  return page.width - page.margin * 2;
}

async function loadImageDataUrl(src: string) {
  return new Promise<string | null>((resolve) => {
    const image = new Image();

    image.onload = () => {
      try {
        const canvas = document.createElement("canvas");
        canvas.width = image.naturalWidth;
        canvas.height = image.naturalHeight;
        const context = canvas.getContext("2d");

        if (!context) {
          resolve(null);
          return;
        }

        context.drawImage(image, 0, 0);
        resolve(canvas.toDataURL("image/png"));
      } catch {
        resolve(null);
      }
    };

    image.onerror = () => resolve(null);
    image.src = src;
  });
}

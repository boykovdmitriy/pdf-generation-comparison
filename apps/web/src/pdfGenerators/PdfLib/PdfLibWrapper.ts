import { Color, PDFDocument, PDFFont, PDFPage } from 'pdf-lib';

export class PdfLibWrapper {
  private readonly _doc: PDFDocument;
  private readonly _page: PDFPage;
  private readonly _font: PDFFont;

  constructor({
    page,
    doc,
    font,
  }: {
    page: PDFPage;
    doc: PDFDocument;
    font: PDFFont;
  }) {
    this._doc = doc;
    this._page = page;
    this._font = font;
  }

  calculateDimensions(text: string, fontSize: number) {
    return {
      height: this._font.sizeAtHeight(fontSize),
      width: this._font.widthOfTextAtSize(text, fontSize),
    };
  }

  getY(val: number) {
    const { height } = this._page.getSize();
    return Math.abs(height - val);
  }

  drawText({
    text,
    x,
    y,
    size,
    color,
  }: {
    text: string;
    x: number;
    y: number;
    size: number;
    color?: Color;
  }) {
    const dimensions = this.calculateDimensions(text, size);
    this._page.drawText(text, {
      x,
      y: this.getY(dimensions.height + y),
      size: size,
      color,
    });
  }
}

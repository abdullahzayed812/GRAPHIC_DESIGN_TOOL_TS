export interface TextboxStyle {
  borderStyle: string;
  borderColor: string;
  fontSize: string;
  fontFamily: string;
  backgroundColor: string;
  backgroundOpacity: string;
  textColor: string;
  borderRadius: string;
  fontWeight: "normal" | "bold";
  fontStyle: "normal" | "italic";
  textDecoration: "none" | "underline";
  paddingTop: string;
  paddingLeft: string;
  paddingRight: string;
  paddingBottom: string;
  opacity: number;
}

export interface Branding {
  [index: string]: "primary" | "secondary" | "additional" | "fixed";
  textColorBrandingType: "primary" | "secondary" | "additional" | "fixed";
  containerColorBrandingType: "primary" | "secondary" | "additional" | "fixed";
}

export interface Textbox {
  id: string;
  x: number;
  y: number;
  style: TextboxStyle;
  branding: Branding;
  name?: string;
  tag?: string;
}

export class TextboxManager {
  private items: Textbox[] = [];
  private selectedId: string | null = null;

  constructor(initialTextboxes: Textbox[] = []) {
    this.items = initialTextboxes;
  }

  getAll(): Textbox[] {
    return this.items;
  }

  getSelected(): string | null {
    return this.selectedId;
  }

  select(id: string): void {
    this.selectedId = id;
  }

  deselect(): void {
    this.selectedId = null;
  }

  add(): Textbox {
    const newTextbox: Textbox = {
      id: `textbox-${this.items.length + 1}`,
      x: 50,
      y: 50,
      style: {
        borderStyle: "solid",
        borderColor: "#000000",
        fontSize: "16px",
        fontFamily: "Arial",
        backgroundColor: "#FFFFFF",
        backgroundOpacity: "1",
        textColor: "#000000",
        borderRadius: "5px",
        fontWeight: "normal",
        fontStyle: "normal",
        textDecoration: "none",
        paddingTop: "2px",
        paddingLeft: "2px",
        paddingBottom: "2px",
        paddingRight: "2px",
        opacity: 1,
      },
      branding: {
        textColorBrandingType: "fixed",
        containerColorBrandingType: "fixed",
      },
    };
    this.items.push(newTextbox);
    return newTextbox;
  }

  updateCoords(id: string, x: number, y: number): void {
    this.items = this.items.map((textbox) => (textbox.id === id ? { ...textbox, x, y } : textbox));
  }

  updateStyle(id: string, style: Partial<TextboxStyle>): void {
    this.items = this.items.map((textbox) =>
      textbox.id === id ? { ...textbox, style: { ...textbox.style, ...style } } : textbox
    );
  }

  updateMeta(id: string, updates: { name?: string; tag?: string }): void {
    this.items = this.items.map((textbox) => (textbox.id === id ? { ...textbox, ...updates } : textbox));
  }

  updateBranding(
    id: string,
    updates: { type: keyof Branding; value: "primary" | "secondary" | "additional" | "fixed" }
  ): void {
    this.items = this.items.map((textbox) =>
      textbox.id === id ? { ...textbox, branding: { ...textbox.branding, [updates.type]: updates.value } } : textbox
    );
  }

  clear(): void {
    this.items = [];
    this.selectedId = null;
  }

  setAll(textboxes: Textbox[]): void {
    this.items = textboxes;
  }
}

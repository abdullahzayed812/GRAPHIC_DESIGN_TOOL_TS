export interface Logo {
  id: string;
  src: string;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
}

export class LogoManager {
  private items: Logo[] = [];
  private selectedId: string | null = null;

  constructor(initialLogos: Logo[] = []) {
    this.items = initialLogos;
  }

  getAll(): Logo[] {
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

  add(src: string): Logo {
    const newLogo: Logo = {
      id: `logo-${this.items.length + 1}`,
      src,
      x: 100,
      y: 100,
      width: 100,
      height: 100,
      label: "",
    };
    this.items.push(newLogo);
    return newLogo;
  }

  updateCoords(id: string, x: number, y: number): void {
    this.items = this.items.map((logo) => (logo.id === id ? { ...logo, x, y } : logo));
  }

  updateSize(id: string, width: number, height: number): void {
    this.items = this.items.map((logo) => (logo.id === id ? { ...logo, width, height } : logo));
  }

  updateMeta(id: string, updates: { label?: string }): void {
    this.items = this.items.map((logo) => (logo.id === id ? { ...logo, ...updates } : logo));
  }

  clear(): void {
    this.items = [];
    this.selectedId = null;
  }

  setAll(logos: Logo[]): void {
    this.items = logos;
  }
}

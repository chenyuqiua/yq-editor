import { DisplayObject } from "./base";
import type { Point } from "./type";

/** @description 显示对象Dom基础类的抽象 */
export class DomDisplayObject extends DisplayObject {
  declare parent?: DomDisplayObject;
  declare children: DomDisplayObject[];
  public el!: HTMLElement;

  constructor() {
    super();
    this.setElement(document.createElement("div"));
  }

  get time(): number {
    return this.parent?.time ?? 0;
  }

  setElement(el: HTMLElement) {
    if (this.el) {
      this.el.remove();
    }
    this.el = el;
    this.bindEvents();
  }

  bindEvent(eventName: string) {
    (this.el as any)["on" + eventName.toLocaleLowerCase()] = (e: Event) => {
      console.log(eventName, e);
      e.stopPropagation();
      (this as any)["handle" + eventName]?.({
        target: this,
        current: this,
      });
    };
  }

  bindEvents() {
    this.bindEvent("Click");
    this.bindEvent("MouseEnter");
    this.bindEvent("MouseLeave");
    this.bindEvent("MouseDown");
    this.bindEvent("MouseUp");
  }

  handleEvent(type: string) {
    const handler = (event: {
      target: DomDisplayObject;
      current: DomDisplayObject;
    }): boolean => {
      if (this.parent) {
        if (
          (this.parent as any)["handle" + type]?.({
            ...event,
            current: this,
          })
        ) {
          return true;
        }
      }

      return (this as any)["on" + type]?.(event);
    };
    // (this as any)["handle" + type] = handler;
    return handler;
  }

  handleClick = this.handleEvent("Click");
  handleMouseEnter = this.handleEvent("MouseEnter");
  handleMouseLeave = this.handleEvent("MouseLeave");
  handleMouseDown = this.handleEvent("MouseDown");
  handleMouseUp = this.handleEvent("MouseUp");

  onClick(event: { target: DomDisplayObject; current: DomDisplayObject }) {
    if (event.target !== this) return;
    console.log("onClick", this, event);
    return;
  }
  onMountDown(event: { target: DomDisplayObject; current: DomDisplayObject }) {
    if (event.target !== this) return;
    console.log("onMountDown", this, event);
    return;
  }
  onMountUp(event: { target: DomDisplayObject; current: DomDisplayObject }) {
    if (event.target !== this) return;
    console.log("onMountUp", this, event);
    return;
  }

  onMouseEnter(event: { target: DomDisplayObject; current: DomDisplayObject }) {
    if (event.target !== this) return;
    console.log("onMouseEnter", this, event);
    this.el.style.boxShadow = "0 0 0 1px red";
    return;
  }

  onMouseLeave(event: { target: DomDisplayObject; current: DomDisplayObject }) {
    if (event.target !== this) return;
    this.el.style.boxShadow = "none";
    console.log("onMouseLeave", this, event);
    return;
  }

  append(child: DomDisplayObject) {
    this.children.push(child);
    child.parent = this;
  }

  remove() {
    super.remove();
    this.el.remove();
  }

  renderSelf(): void {
    this.el.style.position = "absolute";
    this.el.style.overflow = "hidden";
    this.el.style.top = "0%";
    this.el.style.left = "0%";
    this.el.style.width = this.size.width + "px";
    this.el.style.height = this.size.height + "px";
    this.el.style.transformOrigin = `${this.pivot.x * 100}% ${
      this.pivot.y * 100
    }%`;
    this.el.style.transform = [
      // `translate(${this.position.x}px,${this.position.y}px)`,
      `translate(calc(${-this.pivot.x * 100}% + ${this.position.x}px), calc(${
        -this.pivot.y * 100
      }% + ${this.position.y}px))`,
      `scale(${this.scale.x},${this.scale.y})`,
      `rotate(${this.rotate}rad)`,
      // `matrix(${[0, 3, 1, 4, 2, 5].map((v) => this.matrix[v]).join(",")})`,
    ].join(" ");
  }
  renderChildren(): void {
    for (let i = this.el.childNodes.length - 1; i >= 0; i--) {
      this.el.childNodes[i].remove();
    }

    this.children.forEach((child) => {
      this.el.appendChild(child.el);
      child.render();
    });
  }

  render(): void {
    this.renderSelf();
    this.renderChildren();
  }
}

/** @description 实现类Box的抽象 */
export class Box extends DomDisplayObject {
  renderSelf(): void {
    super.renderSelf();
    this.el.style.background = "#333";
  }
}

/** @description 实现类Image的抽象 */
export class Image extends DomDisplayObject {
  src: string = "";
  imageEl: HTMLImageElement = document.createElement("img");

  crop: Point = { x: 0, y: 0 };

  constructor() {
    super();
    this.el.appendChild(this.imageEl);
  }

  setSrc(src: string) {
    this.src = src;
    this.imageEl.src = src;
  }

  renderChildren(): void {
    for (let i = this.el.childNodes.length - 1; i >= 0; i--) {
      this.el.childNodes[i].remove();
    }
    this.el.appendChild(this.imageEl);
  }

  renderSelf(): void {
    super.renderSelf();
    this.el.style.background = "#9998";
  }
}

/** @description 实现类Group的抽象 */
export class Group extends DomDisplayObject {
  handleClick = (event: {
    target: DomDisplayObject;
    current: DomDisplayObject;
  }): boolean => {
    const newEvent = {
      ...event,
      target: this,
      current: this,
    };

    console.log("Group onClick", this, event);

    if (this.parent) {
      if (this.parent?.handleClick?.(newEvent)) {
        return true;
      }
    }

    this.onClick(newEvent);
    return true;
  };
  onMouseEnter(_event: {
    target: DomDisplayObject;
    current: DomDisplayObject;
  }) {
    this.el.style.boxShadow = "0 0 0 2px red";
    return true;
  }

  onMouseLeave(event: { target: DomDisplayObject; current: DomDisplayObject }) {
    if (event.target !== this) return;
    this.el.style.boxShadow = "none";
    return;
  }

  renderSelf(): void {
    super.renderSelf();
    this.el.style.background = "#9995";
  }
}

/** @description 实现类Stage画布的抽象 */
export class Stage extends DomDisplayObject {
  onClick(_event: {
    target: DomDisplayObject;
    current: DomDisplayObject;
  }): void {}
  onMouseEnter(_event: {
    target: DomDisplayObject;
    current: DomDisplayObject;
  }) {}
  onMouseLeave(_event: {
    target: DomDisplayObject;
    current: DomDisplayObject;
  }) {}
  onMouseDown(_event: {
    target: DomDisplayObject;
    current: DomDisplayObject;
  }) {}
  onMouseUp(_event: { target: DomDisplayObject; current: DomDisplayObject }) {}

  private _time = 0;
  public get time() {
    return this._time;
  }
  public set time(value) {
    this._time = value;
  }

  renderSelf() {
    super.renderSelf();
    this.el.style.background = "#eee";
  }
}

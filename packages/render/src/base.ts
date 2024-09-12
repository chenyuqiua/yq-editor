import type { Point, Scale, Size } from "./type";

interface BaseObject {}

// 基础的显示对象
interface BaseDisplayObject extends BaseObject {
  matrix: [
    scaleX: number, // 缩放X
    skewX: number, // 倾斜X
    x: number, // 位置X
    skewY: number,
    scaleY: number,
    y: number,
  ]; // 矩阵
  position: Point; // 位置
  size: Size; // 宽高尺寸
  scale: Scale; // 缩放
  pivot: Point; // 旋转中心
  rotate: number; // 旋转角度
}

// 显示对象的结构
export interface StructureDisplayObject extends BaseDisplayObject {
  parent?: StructureDisplayObject;
  children: StructureDisplayObject[];
}

/**
 * @description 该类表示显示对象
 */
export class DisplayObject implements StructureDisplayObject {
  public matrix: BaseDisplayObject["matrix"] = [1, 0, 0, 0, 1, 0];
  public size: Size = { width: 0, height: 0 };
  public pivot: Point = { x: 0.5, y: 0.5 };
  public position: Point = { x: 0, y: 0 };
  public scale: Scale = { x: 1, y: 1 };
  public rotate: number = 0;
  public children: DisplayObject[] = [];
  public parent?: DisplayObject;
  public id: string = Math.random().toString().slice(2);

  get top() {
    let _top: typeof this.parent | this = this;
    while (_top.parent !== undefined) {
      _top = _top.parent;
    }
    return _top;
  }

  /** @description 获取基础属性 */
  getBase() {
    return {
      size: { ...this.size },
      pivot: { ...this.pivot },
      position: { ...this.position },
      scale: { ...this.scale },
      rotate: this.rotate,
    };
  }

  /** @description 复制target对象的属性 */
  copyBase(target: DisplayObject) {
    const base = target.getBase();
    for (const key in base) {
      this[key] = base[key];
    }
  }

  /** @description 添加子元素 */
  append(child: DisplayObject) {
    this.children.push(child);
    child.parent = this;
  }

  /** @description 递归的移除所有子元素 */
  remove() {
    this.children.forEach((child) => {
      child.parent = undefined;
      child.remove();
    });
    if (this.parent !== undefined) {
      const index = this.parent.children.indexOf(this);
      this.parent.children.splice(index, 1);
    }
    this.parent = undefined;
  }

  render(): void {}
}

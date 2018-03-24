// Konvaは最後に読み込むこと！
// エラー対策：Uncaught ReferenceError: __importDefault is not define
import { default as Konva } from 'konva';

export class HyperStage {
    private stageObj: Konva.Stage | undefined = undefined;
    private readonly layerBuffer: Konva.Layer[] = [];

    addStage(stage: Konva.Stage) {
        this.stageObj = stage;
        while (0 < this.layerBuffer.length) {
            this.stageObj.add(this.layerBuffer.pop()!);
        }
    }

    addLayer(layer: Konva.Layer) {
        if (this.stageObj !== undefined) {
            this.stageObj.add(layer);
        } else {
            this.layerBuffer.push(layer);
        }
    }

    resize({ width, height }: { width: number; height: number }) {
        if (this.stageObj !== undefined) {
            this.stageObj.setWidth(width);
            this.stageObj.setHeight(height);
        }
    }

    batchDraw() {
        if (this.stageObj !== undefined) {
            this.stageObj.batchDraw();
        }
    }
}

interface HammerCallbacks {
    tap: (event: HammerInput) => void;
}

export class HyperHammer {
    private hammerObj: HammerManager | undefined = undefined;
    private readonly callbacks: HammerCallbacks = {
        tap: () => {
        },
    };

    register(obj: HammerManager) {
        this.hammerObj = obj;
    }

    get tap(): (event: HammerInput) => void {
        return (event) => {
            this.callbacks.tap(event);
        };
    }

    set tap(callback: (event: HammerInput) => void) {
        this.callbacks.tap = callback;
    }
}

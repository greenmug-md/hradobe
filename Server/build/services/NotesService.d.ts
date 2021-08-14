/// <reference types="hapi__joi" />
import Joi from "@hapi/joi";
export interface INoteData {
    canvasSVG: string;
}
export declare const NOTE_DATA_SCHEMA: Joi.ObjectSchema<any>;
declare function toPDF(notesData: INoteData[]): Promise<string>;
declare const _default: {
    toPDF: typeof toPDF;
};
export default _default;
//# sourceMappingURL=NotesService.d.ts.map
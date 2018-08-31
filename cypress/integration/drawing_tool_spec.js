import { block, Color, datatest, px, py } from './_common';
import { operations } from './_operations';

describe('Drawing Tools', () => {
    it('Remove', () => {
        cy.visit('./public/index.html?d=v115@vhG9NYaAFLDmClcJSAVDEHBEooRBUoAVBa9aPCM+AA?A0sBXjB2uBzkBifBplBmhI8NjSFAooMDEPBAAAvhEHiuFA3?XaDEEBAAAHiBAwDHmBAAA');

        operations.screen.writable();

        operations.mode.tools.open();

        operations.mode.tools.removePage();
        operations.mode.tools.removePage();

        operations.mode.editor.nextPage();
        operations.mode.editor.nextPage();

        operations.mode.tools.removePage();

        operations.mode.editor.nextPage();
        operations.mode.editor.nextPage();

        operations.mode.tools.removePage();

        operations.mode.editor.nextPage();

        operations.mode.tools.removePage();
        operations.mode.tools.removePage();

        operations.mode.editor.nextPage();

        operations.mode.tools.removePage();

        // 新規ページ
        operations.mode.block.open();

        operations.mode.editor.nextPage();
        operations.mode.block.L();
        operations.mode.block.dragToRight({ from: 0, to: 5 }, 1);

        operations.mode.editor.nextPage();
        operations.mode.block.J();
        operations.mode.block.dragToRight({ from: 0, to: 5 }, 2);

        operations.mode.editor.nextPage();
        operations.mode.block.S();
        operations.mode.block.dragToRight({ from: 0, to: 5 }, 3);

        operations.mode.editor.nextPage();
        operations.mode.block.Z();
        operations.mode.block.dragToRight({ from: 0, to: 5 }, -1);

        // 書き込んだページを削除
        operations.mode.tools.open();

        operations.mode.editor.backPage();
        operations.mode.tools.removePage();

        operations.mode.editor.backPage();
        operations.mode.tools.removePage();

        operations.mode.editor.backPage();
        operations.mode.tools.removePage();

        operations.settings.copyToClipboard();

        // データを取り出す
        {
            cy.get(datatest('copied-fumen-data')).should('have.attr', 'data', 'v115@QhwwFeBtxwGeBtwwJeXDYaAFLDmClcJSAVDEHBEooR?BUoAVBa9aPCM+AAAvhA2uBIhRpHeRpaeifQXAFLDmClcJSA?VjiSAVG88AYP88AZSdBAvhAplBLhwwFeRpAewwAeAPAeQaA?egHhlQ4C8BtQpJeHiuFA3XaDEEBAAA9giWQaDexDwwBtg0Q?LAewhRLwSQahWQaQLwwwhhlwhA8HeAAJeHmB9gV4Del0Del?lNeFtDeAAA');
        }
    });

    it('Undo/Redo', () => {
        cy.visit('./public/index.html?d=v115@HhglIeglIehlAezhMeAgH');

        operations.screen.writable();

        operations.mode.tools.open();

        operations.mode.editor.nextPage();

        operations.mode.block.open();

        operations.mode.block.S();
        operations.mode.block.dragToRight({ from: 7, to: 9 }, 0);

        operations.mode.block.Z();
        operations.mode.block.dragToRight({ from: 7, to: 9 }, 1);

        operations.mode.block.T();
        operations.mode.block.dragToRight({ from: 7, to: 9 }, 2);

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(9, 0)).should('have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('have.attr', 'color', Color.Normal.T);

        // Undo
        operations.mode.tools.undo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(9, 0)).should('have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('not.have.attr', 'color', Color.Normal.T);

        operations.mode.tools.undo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(9, 0)).should('have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('not.have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('not.have.attr', 'color', Color.Normal.T);

        operations.mode.tools.undo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(9, 0)).should('not.have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('not.have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('not.have.attr', 'color', Color.Normal.T);

        operations.mode.tools.undo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '1 / 1');
        cy.get(block(9, 0)).should('not.have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('not.have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('not.have.attr', 'color', Color.Normal.T);

        operations.mode.tools.undo();

        cy.get(block(6, 0)).should('have.attr', 'color', Color.Normal.I);

        // inference

        operations.mode.block.Inference();
        operations.mode.block.click(9, 0);

        operations.mode.tools.undo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '1 / 1');
        cy.get(block(9, 0)).should('not.have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('not.have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('not.have.attr', 'color', Color.Normal.T);

        // Redo
        operations.mode.tools.redo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(9, 0)).should('not.have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('not.have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('not.have.attr', 'color', Color.Normal.T);

        operations.mode.tools.redo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(9, 0)).should('have.attr', 'color', Color.Normal.S);
        cy.get(block(9, 1)).should('not.have.attr', 'color', Color.Normal.Z);
        cy.get(block(9, 2)).should('not.have.attr', 'color', Color.Normal.T);

        // Remove page
        operations.mode.tools.open();

        operations.mode.editor.backPage();
        operations.mode.tools.removePage();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '1 / 1');

        operations.mode.tools.undo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '1 / 2');
        cy.get(block(6, 0)).should('have.attr', 'color', Color.Normal.I);
        cy.get(block(9, 0)).should('not.have.attr', 'color', Color.Normal.S);

        operations.mode.tools.redo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '1 / 1');

        operations.mode.tools.undo();

        operations.mode.editor.nextPage();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(6, 0)).should('have.attr', 'color', Color.Normal.I);
        cy.get(block(9, 0)).should('have.attr', 'color', Color.Normal.S);

        // New page
        operations.settings.newPage();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '1 / 1');
        cy.get(block(6, 0)).should('not.have.attr', 'color', Color.Normal.I);
        cy.get(block(9, 0)).should('not.have.attr', 'color', Color.Normal.S);

        operations.mode.tools.undo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '2 / 2');
        cy.get(block(6, 0)).should('have.attr', 'color', Color.Normal.I);
        cy.get(block(9, 0)).should('have.attr', 'color', Color.Normal.S);

        operations.mode.tools.redo();

        cy.get(datatest('tools')).find(datatest('text-pages')).should('have.text', '1 / 1');
        cy.get(block(6, 0)).should('not.have.attr', 'color', Color.Normal.I);
        cy.get(block(9, 0)).should('not.have.attr', 'color', Color.Normal.S);

        operations.mode.tools.undo();

        operations.settings.copyToClipboard();

        // データを取り出す
        {
            cy.get(datatest('copied-fumen-data')).should('have.attr', 'data', 'v115@HhglIeglIehlAezhMeAgHihS4JeAgWAA');
        }
    });

    it('Auto save', () => {
        cy.visit('./public/index.html?d=v115@HhglIeglIehlAezhMeAgH');

        operations.screen.writable();

        operations.mode.tools.open();

        operations.mode.editor.nextPage();

        operations.mode.block.open();

        operations.mode.block.O();
        operations.mode.block.dragToRight({ from: 7, to: 9 }, 0);

        operations.mode.block.J();
        operations.mode.block.dragToRight({ from: 7, to: 9 }, 1);

        cy.wait(1000);

        cy.visit('./public/index.html');

        operations.settings.copyToClipboard();

        // データを取り出す
        {
            cy.get(datatest('copied-fumen-data')).should('have.attr', 'data', 'v115@HhglIeglIehlAezhMeAgHYhi0GeSpJeAgH');
        }
    });
});

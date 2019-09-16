import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { ClassService } from '../../services/class.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-class',
    templateUrl: './class.component.html',
    styleUrls: ['./class.component.scss']
})
export class ClassComponent implements OnInit {

    currentUser;
    chapterTitle;
    class;
    shownData;

    value = '';
    def = '';
    code = '';
    output = '';

    pageTitle = '';

    constructor(
        private authService: AuthService,
        private classService: ClassService,
        private route: ActivatedRoute
    ) { }

    ngOnInit() {
        this.route.paramMap.subscribe(async params => {
            await this.getClass(params.get('identity'));

        });
    }

    async getClass(identity) {
        const results = await this.classService.getClass(identity);
        this.class = {id: results.id, ...results.data(), chapters: []};
        await this.getChapters(this.class.id);
        this.showClassOverview();
        this.pageTitle = `${this.class.title} Overview`;
    }

    async getChapters(identity) {
        this.class.chapters = [];
        const result = await this.classService.getClassChapters(identity);
        await result.forEach( async data => {
            this.class.chapters.push({id: data.id, ...data.data(), sections: []});
            await this.getSections(identity, data.id);
        });
        this.class.chapters.sort((a, b) => {
            return a.title - b.title;
        });
    }

    async getSections(classId, chapterId) {
        const chapter = this.class.chapters.find(ch => {
            return ch.id === chapterId;
        });
        chapter.sections = [];
        const result = await this.classService.getChapterSections(classId, chapterId);
        await result.forEach( async item => {
            chapter.sections.push({id: item.id, ...item.data(), terms: []});
            await this.getTerms(classId, chapterId, item.id);
        });
        chapter.sections.sort((a, b) => {
            return a.title - b.title;
        });
    }

    async getTerms(classId, chapterId, sectionId) {
        const chapter = this.class.chapters.find(ch => {
            return ch.id === chapterId;
        });
        const section = chapter.sections.find(sec => {
            return sec.id === sectionId;
        });
        section.terms = [];
        const result = await this.classService.getSectionTerms(classId, chapterId, sectionId);
        result.forEach(item => {
            section.terms.push({id: item.id, ...item.data()});
        });
    }

    newChapter() {
        this.classService.addChapter(this.class.id, this.class.chapters ? this.class.chapters.length + 1 : 1);
        this.getChapters(this.class.id);
    }

    newSection(id) {
        const chapter = this.class.chapters.find(ch => {
            return ch.id === id;
        });
        this.classService.addSection(this.class.id, id, chapter.sections ? chapter.sections.length + 1 : 1);
        this.getSections(this.class.id, id);
    }

    showSection(chapterId, sectionId) {
        const chapter = this.class.chapters.find(ch => {
            return ch.id === chapterId;
        });
        const section = chapter.sections.find(sec => {
            return sec.id === sectionId;
        });
        this.shownData = {chapterId: chapter.id, ...section};
        this.sortShownData();
        this.pageTitle = `Chapter ${chapter.title} Section ${section.title}`;
    }

    showChapterOverview(chapterId) {
        const chapter = this.class.chapters.find(ch => {
            return ch.id === chapterId;
        });
        const data = {id: chapterId, terms: []};
        chapter.sections.forEach(section => {
            data.terms = [...data.terms, ...section.terms];
        });
        this.shownData = data;
        this.sortShownData();
        this.pageTitle = `Chapter ${chapter.title} Overview`;
    }

    showClassOverview() {
        const data = {terms: []};
        this.class.chapters.forEach(chapter => {
            chapter.sections.forEach(section => {
                data.terms = [...data.terms, ...section.terms];
            });
        });
        this.shownData = data;
        this.sortShownData();
        this.pageTitle = `${this.class.title} Overview`;
    }

    sortShownData() {
        this.shownData.terms.sort((a, b) => {
            if (a.value < b.value) {
                return -1;
            }
            else if (a.value > b.value) {
                return 1;
            }
            return 0;
        });
    }

    addTerm() {
        this.code = this.code.replace('\n', '<br>');
        this.code = this.code.replace('    ', '&emsp;');
        this.output = this.output.replace('\n', '<br>');
        this.output = this.output.replace('    ', '&emsp;');
        this.classService.addTerm(this.class.id, this.shownData.chapterId, this.shownData.id, {
            value: this.value,
            def: this.def,
            code: this.code,
            output: this.output
        });
        this.getTerms(this.class.id, this.shownData.chapterId, this.shownData.id);
    }

}

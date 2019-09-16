import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()
export class ClassService {

    constructor() { }

    async getClasses() {
        return await firebase.firestore().collection('notes').get();
    }

    addClass(title) {
        const item = {title};
        firebase.firestore().collection('notes').add(item);
    }

    async getClass(identity) {
        return await firebase.firestore().collection('notes').doc(identity).get();
    }

    async getClassChapters(identity) {
        return await firebase.firestore().collection('notes').doc(identity).collection('chapters').get();
    }

    async getChapterSections(classId, chapterId) {
        return await firebase.firestore()
        .collection('notes')
        .doc(classId)
        .collection('chapters')
        .doc(chapterId)
        .collection('sections')
        .get();
    }

    async getSectionTerms(classId, chapterId, sectionId) {
        return await firebase.firestore()
        .collection('notes')
        .doc(classId)
        .collection('chapters')
        .doc(chapterId)
        .collection('sections')
        .doc(sectionId)
        .collection('terms')
        .get();
    }

    addChapter(identity, title) {
        const item = {title};
        firebase.firestore().collection('notes').doc(identity).collection('chapters').add(item);
    }

    addSection(classId, chapterId, title) {
        const item = {title};
        firebase.firestore().collection('notes').doc(classId).collection('chapters').doc(chapterId).collection('sections').add(item);
    }

    addTerm(classId, chapterId, sectionId, item) {
        firebase.firestore()
        .collection('notes')
        .doc(classId)
        .collection('chapters')
        .doc(chapterId)
        .collection('sections')
        .doc(sectionId)
        .collection('terms')
        .add(item);
    }
}

import React from 'react';
import {create} from 'react-test-renderer';
import {ProfileStatus} from './ProfileStatus';

describe('ProfileStatus component', () => {
    test('Status from props should be in the state', () => {
        const component = create(<ProfileStatus updateStatus={() => '11'} status='yoyo'/>)
        const instance = component.getInstance()
        //@ts-ignore
        expect(instance && instance.state.status).toBe('yoyo')
    })

    test('after creation  span should be displayed', () => {
        const component = create(<ProfileStatus updateStatus={() => '11'} status='yoyo'/>)
        const root = component.root;
        let span = root.findByType('span')
        expect(span).not.toBeNull()
    })

    test('after creation  span should be displayed  with correct status ', () => {
        const component = create(<ProfileStatus updateStatus={() => '11'} status='yoyo'/>)
        const root = component.root;
        let span = root.findByType('span')
        expect(span.children[0]).toBe('yoyo')
    })

    test('input should be displayed in editMode instead of span ', () => {
        const component = create(<ProfileStatus updateStatus={() => '11'} status='yoyo'/>)
        const root = component.root;
        let span = root.findByType('span')
        span.props.onDoubleClick();
        let input = root.findByType('input')
        expect(input.props.value).toBe('yoyo')
    })


})

const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const { ServerSideRender, RangeControl, TextControl, TextareaControl, PanelBody } = wp.components;
const { withSelect } = wp.data;
const { InspectorControls } = wp.editor;
const { createElement } = wp.element;

const icon = createElement('svg', { width: 20, height: 20 },
    createElement('path', { d: 'M16,19 L16,20 C16,21.1045695 15.1045695,22 14,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,10 C2,8.8954305 2.8954305,8 4,8 L5,8 L5,7 C5,5.8954305 5.8954305,5 7,5 L8,5 L8,4 C8,2.8954305 8.8954305,2 10,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,14 C22,15.1045695 21.1045695,16 20,16 L19,16 L19,17 C19,18.1045695 18.1045695,19 17,19 L16,19 Z M16,17 L17,17 L17,7 L7,7 L7,8 L14,8 C15.1045695,8 16,8.8954305 16,10 L16,17 Z M19,14 L20,14 L20,4 L10,4 L10,5 L17,5 C18.1045695,5 19,5.8954305 19,7 L19,14 Z M4,10 L4,20 L14,20 L14,10 L4,10 Z M5,11 L13,11 L13,13 L5,13 L5,11 Z M5,14 L13,14 L13,16 L5,16 L5,14 Z M5,17 L13,17 L13,19 L5,19 L5,17 Z', transform: 'translate(-2.000000, -2.000000)' })
);

registerBlockType('curatewp/related-posts', {
    title: __('Related Posts by CurateWP', 'cwprp'),
    description: __('Related Posts Description', 'cwprp'),

    icon,
    category: 'curatewp',
    keywords: [
        __('CurateWP', 'cwprp'),
        __('Related Posts', 'cwprp'),
        __('Related', 'cwprp'),
    ],

    attributes: {
        number: {
            type: 'string',
            default: 5,
        },
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
    },

    edit: withSelect(function (select) {
        return {
            post_id: select('core/editor').getCurrentPostId(),
        };
    })(function (props) {
        const onChangeNumber = (number) => props.setAttributes({ number });
        const onChangeTitle = (title) => props.setAttributes({ title });
        const onChangeDescription = (description) => props.setAttributes({ description });
        return (
            <div>
                <InspectorControls>
                    <PanelBody initialOpen={true}>
                        <RangeControl
                            label={__('Number of posts to show', 'cwprp')}
                            value={props.attributes.number}
                            min={1}
                            onChange={onChangeNumber} />

                        <TextControl
                            label={__('Title', 'cwprp')}
                            value={props.attributes.title}
                            onChange={onChangeTitle} />

                        <TextareaControl
                            label={__('Description', 'cwprp')}
                            value={props.attributes.description}
                            onChange={onChangeDescription} />
                    </PanelBody>
                </InspectorControls>
                <ServerSideRender
                    block="curatewp/related-posts"
                    attributes={props.attributes}
                    urlQueryArgs={{ post_id: props.post_id }}
                />
            </div>
        );
    }),

    save: function () {
        return null;
    }
});
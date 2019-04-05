
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    ServerSideRender, PanelBody, SVG, Path,
    RangeControl, ToggleControl, SelectControl,
    ExternalLink,
} = wp.components;
const { withSelect } = wp.data;
const { InspectorControls, RichText } = wp.editor;
const { Fragment } = wp.element;

const icon = <SVG viewBox="0 0 24 24"><Path d="M16,19 L16,20 C16,21.1045695 15.1045695,22 14,22 L4,22 C2.8954305,22 2,21.1045695 2,20 L2,10 C2,8.8954305 2.8954305,8 4,8 L5,8 L5,7 C5,5.8954305 5.8954305,5 7,5 L8,5 L8,4 C8,2.8954305 8.8954305,2 10,2 L20,2 C21.1045695,2 22,2.8954305 22,4 L22,14 C22,15.1045695 21.1045695,16 20,16 L19,16 L19,17 C19,18.1045695 18.1045695,19 17,19 L16,19 Z M16,17 L17,17 L17,7 L7,7 L7,8 L14,8 C15.1045695,8 16,8.8954305 16,10 L16,17 Z M19,14 L20,14 L20,4 L10,4 L10,5 L17,5 C18.1045695,5 19,5.8954305 19,7 L19,14 Z M4,10 L4,20 L14,20 L14,10 L4,10 Z M5,11 L13,11 L13,13 L5,13 L5,11 Z M5,14 L13,14 L13,16 L5,16 L5,14 Z M5,17 L13,17 L13,19 L5,19 L5,17 Z"></Path></SVG>;

registerBlockType('curatewp/related-posts', {
    title: __('Related Posts', 'cwprp'),
    description: (
        <Fragment>
            <p>{__('Keep visitors engaged by highlighting relevant content.', 'cwprp')}</p>
            <ExternalLink href="https://curatewp.com/">
                {__('Get CurateWP', 'cwprp')}
            </ExternalLink>
        </Fragment>
    ),

    icon,
    category: 'curatewp',

    keywords: [
        __('related', 'cwprp'),
        __('engagement', 'cwprp'),
        __('similar', 'cwprp'),
    ],

    attributes: {
        title: {
            type: 'string',
        },
        description: {
            type: 'string',
        },
        in_category: {
            type: 'boolean',
            default: true,
        },
        in_tag: {
            type: 'boolean',
            default: false,
        },
        number: {
            type: 'number',
            default: 5,
        },
        orderby: {
            type: 'string',
            default: 'rand',
        },
        order: {
            type: 'string',
            default: '',
        },
    },

    edit: withSelect(function (select) {
        return {
            post_id: select('core/editor').getCurrentPostId(),
        };
    })(function ({ post_id, setAttributes, attributes, isSelected }) {
        const { number, orderby, order, title, description, in_category, in_tag } = attributes;
        return (
            <div>
                <InspectorControls>
                    <PanelBody initialOpen={true}>
                        <RangeControl
                            label={__('Number of posts to show', 'cwprp')}
                            value={number}
                            min={1}
                            onChange={(number) => setAttributes({ number })} />

                        <SelectControl
                            label={__('Order by', 'cwprp')}
                            value={`${orderby}/${order}`}
                            options={[
                                {
                                    /* translators: label for ordering posts by date in descending order. */
                                    label: __('Newest to Oldest', 'cwprp'),
                                    value: 'date/desc',
                                },
                                {
                                    /* translators: label for ordering posts by date in ascending order. */
                                    label: __('Oldest to Newest', 'cwprp'),
                                    value: 'date/asc',
                                },
                                {
                                    /* translators: label for ordering posts by title in ascending order. */
                                    label: __('A → Z', 'cwprp'),
                                    value: 'title/asc',
                                },
                                {
                                    /* translators: label for ordering posts by title in descending order. */
                                    label: __('Z → A', 'cwprp'),
                                    value: 'title/desc',
                                },
                                {
                                    /* translators: label for randomly ordering posts. */
                                    label: __('Random', 'cwprp'),
                                    value: 'rand/',
                                },
                            ]}
                            onChange={(value) => {
                                const [newOrderBy, newOrder] = value.split('/');
                                if (newOrder !== order) {
                                    setAttributes({ order: newOrder });
                                }
                                if (newOrderBy !== orderby) {
                                    setAttributes({ orderby: newOrderBy });
                                }
                            }} />

                        <ToggleControl
                            label={__('In Category', 'cwprp')}
                            help={in_category ? __('Including posts from the same categories.', 'cwprp') : __('Toggle to show posts from the same categories.', 'cwprp')}
                            checked={in_category}
                            onChange={() => setAttributes({ in_category: !in_category })} />

                        <ToggleControl
                            label={__('In Tag', 'cwprp')}
                            help={in_tag ? __('Including posts from the same tags.', 'cwprp') : __('Toggle to show posts from the same tags.', 'cwprp')}
                            checked={in_tag}
                            onChange={() => setAttributes({ in_tag: !in_tag })} />

                    </PanelBody>
                </InspectorControls>

                {(title || isSelected) &&
                    <RichText
                        tagName="h3"
                        className="curatewp-section-header__title"
                        placeholder={__('Title for section', 'cwprp')}
                        value={title}
                        formattingControls={[]}
                        multiline={false}
                        onChange={(title) => setAttributes({ title: title.replace(/<br>/gi, ' ') })} />
                }

                {(description || isSelected) &&
                    <RichText
                        tagName="p"
                        className="curatewp-section-header__description"
                        placeholder={__('Description for section...', 'cwprp')}
                        value={description}
                        formattingControls={[]}
                        multiline={false}
                        onChange={(description) => setAttributes({ description: description.replace(/<br>/gi, ' ') })} />
                }

                <ServerSideRender
                    block="curatewp/related-posts"
                    attributes={{ in_category, in_tag, number, orderby, order }}
                    urlQueryArgs={{ post_id }} />

            </div>
        );
    }),

    save: function () {
        return null;
    }
});
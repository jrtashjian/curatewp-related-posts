
const { __ } = wp.i18n;
const { registerBlockType } = wp.blocks;
const {
    ServerSideRender, PanelBody, ExternalLink,
    RangeControl, ToggleControl, SelectControl,
} = wp.components;
const { withSelect } = wp.data;
const { InspectorControls, RichText } = wp.editor;
const { Fragment } = wp.element;

const icon = <svg viewbox="0 0 24 24"><g fill="none" fill-rule="evenodd"><rect fill="#FFD700" width="24" height="24" rx="2" /><path d="M18 16l-2 1-7-4v-1-1l7-4a3 3 0 0 0 5-2 3 3 0 1 0-6 1l-7 4a3 3 0 0 0-5 2 3 3 0 0 0 5 2l7 4v1a3 3 0 1 0 3-3z" fill="#191500" fill-rule="nonzero" /></g></svg>;

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
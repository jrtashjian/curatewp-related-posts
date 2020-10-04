/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Component } from '@wordpress/element';
import { withSelect, dispatch } from '@wordpress/data';
import {
	ServerSideRender,
	PanelBody,
	RangeControl,
	SelectControl,
	ToggleControl,
	Disabled,
	Button,
} from '@wordpress/components';
import { createBlock } from '@wordpress/blocks';
import {
	InspectorControls,
	Warning,
} from '@wordpress/block-editor';

class RelatedPostsEdit extends Component {
	constructor() {
		super( ...arguments );

		this.deprecateSectionDetails = this.deprecateSectionDetails.bind( this );
		this.convertSectionDetails = this.convertSectionDetails.bind( this );
	}

	deprecateSectionDetails() {
		this.props.setAttributes( {
			title: null,
			description: null,
		} );
	}

	convertSectionDetails() {
		const { getBlockIndex, clientId, attributes } = this.props;
		const { title, description } = attributes;

		const blockIndex = getBlockIndex( clientId );

		dispatch( 'core/editor' ).insertBlocks( [
			createBlock( 'core/heading', { level: 3, content: title } ),
			createBlock( 'core/paragraph', { content: description } ),
		], blockIndex, undefined, false );

		this.deprecateSectionDetails();
	}

	render() {
		const { attributes, setAttributes, isSelected, postID } = this.props;
		const { in_category, in_tag, number, orderby, order } = attributes;

		return (
			<div>
				{ isSelected && attributes.title &&
					<Warning
						actions={ [
							<Button key="remove" isDefault onClick={ this.deprecateSectionDetails }>{ __( 'Remove', 'cwprp' ) }</Button>,
							<Button key="convert" isPrimary onClick={ this.convertSectionDetails }>{ __( 'Convert to Blocks', 'cwprp' ) }</Button>,
						] }>
						{ __( 'Section title and description has been deprecated.', 'cwprp' ) }
					</Warning>
				}
				<InspectorControls>
					<PanelBody initialOpen={ true }>
						<RangeControl
							label={ __( 'Number of posts to show', 'cwprp' ) }
							value={ number }
							min={ 1 }
							onChange={ ( newNumber ) => setAttributes( { number: newNumber } ) } />

						<SelectControl
							label={ __( 'Order by', 'cwprp' ) }
							value={ `${ orderby }/${ order }` }
							options={ [
								{
									/* translators: label for ordering posts by date in descending order. */
									label: __( 'Newest to Oldest', 'cwprp' ),
									value: 'date/desc',
								},
								{
									/* translators: label for ordering posts by date in ascending order. */
									label: __( 'Oldest to Newest', 'cwprp' ),
									value: 'date/asc',
								},
								{
									/* translators: label for ordering posts by title in ascending order. */
									label: __( 'A → Z', 'cwprp' ),
									value: 'title/asc',
								},
								{
									/* translators: label for ordering posts by title in descending order. */
									label: __( 'Z → A', 'cwprp' ),
									value: 'title/desc',
								},
								{
									/* translators: label for randomly ordering posts. */
									label: __( 'Random', 'cwprp' ),
									value: 'rand/',
								},
							] }
							onChange={ ( value ) => {
								const [ newOrderBy, newOrder ] = value.split( '/' );
								if ( newOrder !== order ) {
									setAttributes( { order: newOrder } );
								}
								if ( newOrderBy !== orderby ) {
									setAttributes( { orderby: newOrderBy } );
								}
							} } />

						<ToggleControl
							label={ __( 'In Category', 'cwprp' ) }
							help={ in_category ? __( 'Including posts from the same categories.', 'cwprp' ) : __( 'Toggle to show posts from the same categories.', 'cwprp' ) }
							checked={ in_category }
							onChange={ () => setAttributes( { in_category: ! in_category } ) } />

						<ToggleControl
							label={ __( 'In Tag', 'cwprp' ) }
							help={ in_tag ? __( 'Including posts from the same tags.', 'cwprp' ) : __( 'Toggle to show posts from the same tags.', 'cwprp' ) }
							checked={ in_tag }
							onChange={ () => setAttributes( { in_tag: ! in_tag } ) } />

					</PanelBody>
				</InspectorControls>

				<Disabled>
					<ServerSideRender
						block="curatewp/related-posts"
						attributes={ attributes }
						urlQueryArgs={ { postID } } />
				</Disabled>

			</div>
		);
	}
}

export default withSelect( ( select ) => {
	const { getCurrentPostId, getBlockIndex } = select( 'core/editor' );

	return {
		postID: getCurrentPostId(),
		getBlockIndex,
	};
} )( RelatedPostsEdit );

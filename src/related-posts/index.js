/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { ExternalLink } from '@wordpress/components';

/**
 * Internal dependencies
 */
import edit from './edit';
import icon from './icon';

export const name = 'curatewp/related-posts';

export const settings = {
    title: __( 'Related Posts', 'cwprp' ),
	description: (
		<Fragment>
			<p>{ __( 'Keep visitors engaged by highlighting relevant content.' ) }</p>
			<ExternalLink href="https://curatewp.com/">
				{ __( 'Get CurateWP', 'cwprp' ) }
			</ExternalLink>
		</Fragment>
    ),
    icon,
    category: 'curatewp',
    keywords: [ __( 'related', 'cwprp' ), __( 'engagement', 'cwprp' ), __( 'similar', 'cwprp' ) ],
	edit,
	save: () => null,
};
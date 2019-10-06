/**
 * WordPress dependencies
 */
import { Path, Rect, G, SVG } from '@wordpress/components';

export default (
    <SVG viewBox="0 0 24 24">
        <G fill="none" fillRule="evenodd">
            <Rect fill="#FFD700" width="24" height="24" rx="2" />
            <Path d="M18 16l-2 1-7-4v-1-1l7-4a3 3 0 0 0 5-2 3 3 0 1 0-6 1l-7 4a3 3 0 0 0-5 2 3 3 0 0 0 5 2l7 4v1a3 3 0 1 0 3-3z" fill="#191500" fillRule="nonzero" />
        </G>
    </SVG>
);
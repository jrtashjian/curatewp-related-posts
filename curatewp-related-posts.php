<?php // phpcs:ignore Squiz.Commenting.FileComment

/*
Plugin Name: CurateWP - Related Posts
Plugin URI: https://curatewp.com/
Description: Display related posts within the current post, in a widget, and in your theme.
Version: 1.2.2
Author: JR Tashjian
Author URI: https://jrtashjian.com
Text Domain: cwprp
Domain Path: languages

Copyright 2019-2020 JR Tashjian

This program is free software; you can redistribute it and/or modify
it under the terms of the GNU General Public License as published by
the Free Software Foundation; either version 2 of the License, or
(at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
GNU General Public License for more details.

You should have received a copy of the GNU General Public License
along with this program; if not, see <http://www.gnu.org/licenses/>.
*/

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

define( 'CWPRP_VERSION', '1.2.2' );
define( 'CWPRP_PLUGIN_DIR', dirname( __FILE__ ) );
define( 'CWPRP_PLUGIN_URL', plugin_dir_url( __FILE__ ) );

if ( ! version_compare( PHP_VERSION, '5.6', '<' ) ) {
	include_once CWPRP_PLUGIN_DIR . '/includes/Core.php';

	\CurateWP\RelatedPosts\Core::init();
} else {
	add_action( 'admin_notices', 'cwprp_below_php_version_notice' );
}

/**
 * Show an error to sites running PHP < 5.6
 *
 * @since 1.0.0
 */
function cwprp_below_php_version_notice() {
	// Translators: this message outputs a minimum PHP requirement.
	echo '<div class="error"><p>' . esc_html( sprintf( __( 'Your version of PHP (%s) is below the minimum version of PHP required by CurateWP - Related Posts (5.6). Please contact your host and request that your version be upgraded to 5.6 or later.', 'cwprp' ), PHP_VERSION ) ) . '</p></div>';
}

<?php
/**
 * The Template class.
 *
 * @since 1.0.0
 *
 * @package CurateWP
 * @author JR Tashjian <jr@curatewp.com>
 */

namespace CurateWP\RelatedPosts;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * The Template class.
 *
 * @since 1.0.0.
 */
class Template {

	/**
	 * The data being passed into the template.
	 *
	 * @since 1.0.0
	 *
	 * @var array
	 */
	protected static $data = array();

	/**
	 * "Pass" data into the loaded template by setting a class property,
	 * calling load_template, and then resetting the class property so that
	 * it does not stay polluted.
	 *
	 * @since 1.0.0
	 *
	 * @param array $template_names The template names in order of precedence.
	 * @param array $data The data passed for use within the loaded template.
	 *
	 * @return string The rendered template HTML.
	 */
	public static function load_template( $template_names, $data = array() ) {
		self::set_data( $data );

		ob_start();
		load_template( self::locate_template( $template_names ), false );
		$output = ob_get_clean();

		self::reset_data();

		return $output;
	}

	/**
	 * Check for the applicable template in the child theme, then parent theme,
	 * and in the plugin directory as a last resort. Return the path if it was located.
	 *
	 * @since 1.0.0
	 *
	 * @param array $template_names The template names in order of precendence.
	 *
	 * @return bool|string The location of the applicable template file.
	 */
	protected static function locate_template( $template_names ) {

		// default to not found.
		$located = false;

		/**
		 * Filters the template directory name for the current theme.
		 *
		 * @since 1.0.0
		 *
		 * @param string $template_dir The template directory.
		 */
		$template_dir = apply_filters( 'curatewp_template_dir', 'curatewp' );

		// Try to find the template file.
		foreach ( (array) $template_names as $template_name ) {

			// Continue if template is empty.
			if ( empty( $template_name ) ) {
				continue;
			}

			// Trim off any slashes from the template name.
			$template_name = ltrim( $template_name, '/' );

			// Check child theme first.
			$maybe_child_theme = trailingslashit( get_stylesheet_directory() ) . trailingslashit( $template_dir ) . $template_name;
			if ( file_exists( $maybe_child_theme ) ) {
				$located = $maybe_child_theme;
				break;
			}

			// Check parent theme next.
			$maybe_parent_theme = trailingslashit( get_template_directory() ) . trailingslashit( $template_dir ) . $template_name;
			if ( file_exists( $maybe_parent_theme ) ) {
				$located = $maybe_parent_theme;
				break;
			}

			// Check theme compat.
			$maybe_theme_compat = trailingslashit( dirname( dirname( __FILE__ ) ) ) . 'templates/' . $template_name;
			if ( file_exists( $maybe_theme_compat ) ) {
				$located = $maybe_theme_compat;
				break;
			}
		}

		return $located;
	}

	/**
	 * Get an option value from saved template data.
	 *
	 * @since 1.0.0
	 *
	 * @param string $option Option to get from the template data.
	 *
	 * @return mixed
	 */
	public static function get_value( $option ) {
		if ( ! empty( self::$data ) && ! empty( self::$data[ $option ] ) ) {
			return self::$data[ $option ];
		}
		return null;
	}

	/**
	 * Store data in the class property.
	 *
	 * @since 1.0.0
	 *
	 * @param array $data The data to be stored.
	 */
	protected static function set_data( $data ) {
		self::$data = array_merge( self::$data, $data );
	}

	/**
	 * Reset the data class property.
	 *
	 * @since 1.0.0
	 */
	protected static function reset_data() {
		self::$data = array();
	}
}

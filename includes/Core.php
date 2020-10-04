<?php
/**
 * The Core CWPRP class.
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
 * The Core RelatedPosts class.
 *
 * @since 1.0.0
 */
class Core {

	/**
	 * Hook into WordPress to initialize.
	 *
	 * @since 1.0.0
	 */
	public static function init() {
		require_once CWPRP_PLUGIN_DIR . '/vendor/autoload.php';
		require_once CWPRP_PLUGIN_DIR . '/includes/template-functions.php';

		add_action( 'init', array( get_called_class(), 'load_textdomain' ) );
		add_action( 'init', array( get_called_class(), 'register_block_type' ) );
		add_filter( 'block_categories', array( get_called_class(), 'block_categories' ) );

		add_action( 'wp_enqueue_scripts', array( get_called_class(), 'load_layout_styles' ) );
		add_action( 'enqueue_block_assets', array( get_called_class(), 'load_layout_styles' ) );

		add_action( 'widgets_init', array( get_called_class(), 'register_widgets' ) );
		add_shortcode( 'curatewp_related_posts', array( get_called_class(), 'shortcode' ) );
	}

	/**
	 * Determine if CurateWP is active on the site.
	 *
	 * @since 1.0.0
	 *
	 * @return bool
	 */
	public static function is_curatewp_active() {
		if ( ! is_admin() ) {
			include_once ABSPATH . 'wp-admin/includes/plugin.php';
		}
		return is_plugin_active( 'curatewp/curatewp.php' );
	}

	/**
	 * Load all translations for our plugin.
	 *
	 * @since 1.0.0
	 */
	public static function load_textdomain() {
		load_plugin_textdomain( 'cwprp', false, plugin_basename( CWPRP_PLUGIN_DIR ) . '/languages' );
	}

	/**
	 * Register our widget.
	 *
	 * @since 1.0.0
	 */
	public static function register_widgets() {
		register_widget( 'CurateWP\RelatedPosts\Widget' );
	}

	/**
	 * Register the shortcode.
	 *
	 * @since 1.0.0
	 *
	 * @param array $atts The attributes passed.
	 *
	 * @return string The rendered template HTML.
	 */
	public static function shortcode( $atts ) {
		return curatewp_related_posts( $atts );
	}

	/**
	 * Load layout styles.
	 *
	 * @since 1.0.0
	 */
	public static function load_layout_styles() {
		/**
		 * Filters whether to load the layout css.
		 *
		 * Returning false to this hook will prevent the layout css from loading.
		 *
		 * @since 1.0.0
		 *
		 * @param bool $load_layout_css Whether the layout css should be loaded. Default true.
		 */
		$load_layout_css = apply_filters( 'cwprp_load_layout_css', ! self::is_curatewp_active() );

		if ( $load_layout_css ) {
			wp_enqueue_style(
				'cwprp-layouts',
				CWPRP_PLUGIN_URL . 'build/style-index.css',
				array(),
				CWPRP_VERSION
			);
		}
	}

	/**
	 * Register our block type if Gutenberg is active.
	 *
	 * @since 1.0.0
	 */
	public static function register_block_type() {

		if ( ! function_exists( 'register_block_type' ) ) {
			// Gutenberg is not active.
			return;
		}

		$asset_file = include CWPRP_PLUGIN_DIR . '/build/index.asset.php';

		wp_register_script(
			'cwprp-block',
			CWPRP_PLUGIN_URL . 'build/index.js',
			$asset_file['dependencies'],
			$asset_file['version'],
			true // Enqueue script in the footer.
		);

		register_block_type(
			'curatewp/related-posts',
			array(
				'editor_script'   => 'cwprp-block',
				'editor_style'    => 'cwprp-block',
				'attributes'      => array(
					'className'   => array( 'type' => 'string' ),
					'title'       => array( 'type' => 'string' ),
					'description' => array( 'type' => 'string' ),
					'in_category' => array(
						'type'    => 'boolean',
						'default' => true,
					),
					'in_tag'      => array(
						'type'    => 'boolean',
						'default' => false,
					),
					'number'      => array(
						'type'    => 'integer',
						'default' => 5,
					),
					'orderby'     => array(
						'type'    => 'string',
						'default' => 'rand',
					),
					'order'       => array(
						'type'    => 'string',
						'default' => '',
					),
				),
				'render_callback' => array( get_called_class(), 'render_block_related_posts' ),
			)
		);

		if ( function_exists( 'wp_set_script_translations' ) ) {
			wp_set_script_translations( 'cwprp-block', 'cwprp', CWPRP_PLUGIN_DIR . '/languages' );
		}
	}

	/**
	 * Add a block category for CurateWP if it doesn't exist already.
	 *
	 * @since 1.0.0
	 *
	 * @param array $categories Array of block categories.
	 *
	 * @return array
	 */
	public static function block_categories( $categories ) {
		$category_slugs = wp_list_pluck( $categories, 'slug' );
		return in_array( 'curatewp', $category_slugs, true ) ? $categories : array_merge(
			$categories,
			array(
				array(
					'slug'  => 'curatewp',
					'title' => __( 'CurateWP', 'cwprp' ),
					'icon'  => null,
				),
			)
		);
	}

	/**
	 * Render the server-side block on the front-end.
	 *
	 * @since 1.0.0
	 *
	 * @param array  $attributes The block attributes.
	 * @param string $content The block inner content.
	 *
	 * @return string
	 */
	public static function render_block_related_posts( $attributes, $content ) { // phpcs:ignore Generic.CodeAnalysis.UnusedFunctionParameter
		$args = array_merge(
			$attributes,
			array(
				'post_id' => empty( $_GET['post_id'] ) ? null : abs( $_GET['post_id'] ), // phpcs:ignore WordPress.Security.NonceVerification
				'class'   => empty( $attributes['className'] ) ? '' : sanitize_text_field( $attributes['className'] ),
			)
		);
		return curatewp_related_posts( $args );
	}
}

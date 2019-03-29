<?php
/**
 * The Widget class.
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
 * The Widget class.
 *
 * @since 1.0.0
 */
class Widget extends \WP_Widget {
	/**
	 * Sets up a new CWPRP widget instance.
	 *
	 * @since 1.0.0
	 */
	public function __construct() {
		$widget_options = array(
			'description' => __( 'A section of related posts.', 'cwprp' ),
		);
		parent::__construct( 'cwprp_widget', __( 'Related Posts (CurateWP)', 'cwprp' ), $widget_options );
	}

	/**
	 * Outputs the content for the current CWPRP widget instance.
	 *
	 * @since 1.0.0
	 *
	 * @param array $args     Display arguments including 'before_title', 'after_title',
	 *                        'before_widget', and 'after_widget'.
	 * @param array $instance The settings for the particular instance of the widget.
	 */
	public function widget( $args, $instance ) {
		$title = ! empty( $instance['title'] ) ? $instance['title'] : '';

		echo wp_kses_post( $args['before_widget'] );

		if ( $title ) {
			echo wp_kses_post( $args['before_title'] . $title . $args['after_title'] );
		}

		echo wp_kses_post( 'related posts' );

		echo wp_kses_post( $args['after_widget'] );
	}

	/**
	 * Handles updating settings for the current CWPRP widget instance.
	 *
	 * @since 1.0.0
	 *
	 * @param array $new_instance New settings for this instance as input by the user via
	 *                            WP_Widget::form().
	 * @param array $old_instance Old settings for this instance.
	 *
	 * @return array Settings to save or bool false to cancel saving.
	 */
	public function update( $new_instance, $old_instance ) {
		$instance = array();

		if ( ! empty( $new_instance['title'] ) ) {
			$instance['title'] = sanitize_text_field( $new_instance['title'] );
		}

		return $instance;
	}

	/**
	 * Outputs the settings update form.
	 *
	 * @since 1.0.0
	 * @see WP_Widget::form()
	 *
	 * @param array $instance Current settings.
	 */
	public function form( $instance ) {
		$title = isset( $instance['title'] ) ? $instance['title'] : '';
		?>
		<div class="curatewp-widget-form-controls">
			<p>
				<label for="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>">
					<?php esc_attr_e( 'Title:', 'cwprp' ); ?>
				</label>
				<input type="text" class="widefat"
					id="<?php echo esc_attr( $this->get_field_id( 'title' ) ); ?>"
					name="<?php echo esc_attr( $this->get_field_name( 'title' ) ); ?>"
					value="<?php echo esc_attr( $title ); ?>" />
			</p>
		</div>
		<?php
	}
}

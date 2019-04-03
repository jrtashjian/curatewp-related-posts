<?php
/**
 * CWPRP Template Functions.
 *
 * @since 1.0.0
 *
 * @package CurateWP
 * @author JR Tashjian <jr@curatewp.com>
 */

/**
 * Ouput the related posts.
 *
 * @since 1.0.0
 *
 * @param array  $args Optional. Arguments to configure a section.
 * @param int $post_id Optional. The post ID to query related posts for.
 *
 * @return string The rendered HTML.
 */
function curatewp_related_posts( $args = array() ) {
	$post_id = empty( $args['post_id'] ) ? get_the_ID() : $args['post_id'];

	$cache_group   = 'curatewp';
	$cached_key    = $cache_group . '_related_posts_' . md5( $post_id . wp_json_encode( $args ) ) . '_posts';
	$related_posts = wp_cache_get( $cached_key, $cache_group );

	if ( false === $related_posts ) {
		$related_posts = array();

		$post_categories   = get_the_terms( $post_id, 'category' );
		$post_category_ids = empty( $post_categories ) ? array() : wp_list_pluck( $post_categories, 'term_id' );

		$post_tags    = get_the_terms( $post_id, 'post_tag' );
		$post_tag_ids = empty( $post_tags ) ? array() : wp_list_pluck( $post_tags, 'term_id' );

		$query_args = array(
			'category__in'           => $post_category_ids,
			'tag__in'                => $post_tag_ids,
			'post__not_in'           => array( $post_id ),
			'no_found_rows'          => true,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,
		);

		if ( ! empty( $args['number'] ) ) {
			$query_args['posts_per_page'] = abs( $args['number'] );
		}

		/**
		 * Filters the query arguments for the current object in the section.
		 *
		 * @since 1.0.0
		 *
		 * @param array $query_args The object's query arguments.
		 */
		$query_args = apply_filters( 'curatewp_related_posts_object_query_args', $query_args );

		$posts_query = new \WP_Query( $query_args );

		if ( ! $posts_query->have_posts() ) {
			return '';
		}

		$related_posts = array_merge(
			$related_posts,
			wp_list_pluck( $posts_query->posts, 'ID' )
		);

		/**
		 * Filters the related post ids for the section.
		 *
		 * @since 1.0.0
		 *
		 * @param array $related_posts The queried post ids.
		 */
		$related_posts = apply_filters( 'curatewp_related_posts_posts', $related_posts );

		/**
		 * Filters the cache time for the related posts object.
		 *
		 * @since 1.0.0
		 *
		 * @param int $cache_time_in_seconds The cache time in seconds.
		 */
		$cache_time_in_seconds = apply_filters( 'curatewp_related_posts_objects_cache_time', DAY_IN_SECONDS );

		wp_cache_set( $cached_key, $related_posts, $cache_group, $cache_time_in_seconds );
	}

	wp_reset_postdata();
	ob_start();
	?>

	<div class="<?php echo esc_attr( join( ' ', [] ) ); ?>">
		<div class="curatewp-section-header">
			<?php if ( ! empty( $args['title'] ) ) : ?>
				<h3 class="curatewp-section-header__title"><?php echo esc_html( $args['title'] ); ?></h3>
			<?php endif; ?>

			<?php if ( $args['description'] ) : ?>
				<p class="curatewp-section-header__description"><?php echo esc_html( $args['description'] ); ?></p>
			<?php endif; ?>
		</div>

		<?php if ( ! empty( $related_posts ) ) : ?>
			<div class="curatewp-section-collection curatewp-section-collection--default">

				<?php foreach ( $related_posts as $related_post_id ) : ?>
					<div <?php post_class( 'curatewp-card curatewp-card--wide curatewp-grid--whole', $related_post_id ); ?>>

						<?php
						if ( has_post_thumbnail( $related_post_id ) ) :
							$curatewp_post_thumbnail_url = wp_get_attachment_url( get_post_thumbnail_id( $related_post_id ) );
							?>
							<div class="curatewp-card__image" style="background-image:url(<?php echo esc_url( $curatewp_post_thumbnail_url ); ?>);"></div>
						<?php endif; ?>

						<div class="curatewp-card__content">
							<h4 class="curatewp-card__title">
								<a href="<?php the_permalink( $related_post_id ); ?>">
									<?php echo esc_html( get_the_title( $related_post_id ) ); ?>
								</a>
							</h4>
							<div class="curatewp-card__date">
								<?php echo esc_html( get_the_date( '', $related_post_id ) ); ?>
							</div>
						</div>

					</div>
				<?php endforeach; ?>

			</div>
		<?php endif; ?>
	</div>

	<?php
	$output = ob_get_clean();
	return $output;
}

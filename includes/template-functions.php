<?php
/**
 * CWPRP Template Functions.
 *
 * @since 1.0.0
 *
 * @package CWPRP
 * @author JR Tashjian <jr@curatewp.com>
 */

/**
 * Ouput the related posts.
 *
 * @since 1.0.0
 *
 * @param array  $args Optional. Arguments to configure a section.
 *
 * @return string The rendered template HTML.
 */
function curatewp_related_posts( $args = null ) {
	$post_id = get_the_ID();

	$post_categories   = get_the_terms( $post_id, 'category' );
	$post_category_ids = empty( $post_categories ) ? array() : wp_list_pluck( $post_categories, 'term_id' );

	$post_tags    = get_the_terms( $post_id, 'post_tag' );
	$post_tag_ids = empty( $post_tags ) ? array() : wp_list_pluck( $post_tags, 'term_id' );

	$posts_query = new \WP_Query(
		array(
			'category__in'   => $post_category_ids,
			'tag__in'        => $post_tag_ids,
			'post__not_in'   => array( $post_id ),
			'posts_per_page' => 10,
		)
	);

	if ( ! $posts_query->have_posts() ) {
		return '';
	}

	$html   = array();
	$html[] = '<ul>';

	while ( $posts_query->have_posts() ) {
		$posts_query->the_post();
		$html[] = '<li>' . get_the_title( $posts_query->post->ID ) . '</li>';
	}

	$html[] = '</ul>';

	wp_reset_postdata();

	return implode( '', $html );
}
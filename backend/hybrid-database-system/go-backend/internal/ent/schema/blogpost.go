package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

type BlogContentType string

const (
	BlogContentTypeArticle  BlogContentType = "article"
	BlogContentTypeVlog     BlogContentType = "vlog"
	BlogContentTypePodcast  BlogContentType = "podcast"
	BlogContentTypeTutorial BlogContentType = "tutorial"
)

type BlogStatus string

const (
	BlogStatusDraft     BlogStatus = "draft"
	BlogStatusPublished BlogStatus = "published"
	BlogStatusArchived  BlogStatus = "archived"
)

// BlogPost holds the schema definition for the BlogPost entity.
type BlogPost struct {
	ent.Schema
}

// Fields of the BlogPost.
func (BlogPost) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("user_id", uuid.UUID{}),
		field.UUID("category_id", uuid.UUID{}).
			Optional(),
		field.UUID("series_id", uuid.UUID{}).
			Optional(),
		field.String("title").
			MaxLen(500),
		field.String("slug").
			MaxLen(300).
			Unique(),
		field.Text("excerpt").
			Optional(),
		field.Text("content"),
		field.Enum("content_type").
			Values("article", "vlog", "podcast", "tutorial").
			Default("article"),
		field.Enum("status").
			Values("draft", "published", "archived").
			Default("draft"),
		field.Bool("is_featured").
			Default(false),
		field.String("featured_image_url").
			Optional().
			MaxLen(500),
		field.Int("reading_time_minutes").
			Optional(),
		field.Int("view_count").
			Default(0),
		field.Int("like_count").
			Default(0),
		field.Int("comment_count").
			Default(0),
		field.Time("published_at").
			Optional(),
		field.Int("series_order").
			Optional(),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the BlogPost.
func (BlogPost) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("blog_posts").
			Unique(),
		edge.From("category", BlogCategory.Type).
			Ref("blog_posts").
			Unique(),
		edge.From("series", BlogSeries.Type).
			Ref("blog_posts").
			Unique(),
		edge.To("tags", BlogTag.Type),
		edge.To("comments", BlogComment.Type),
	}
}

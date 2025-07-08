package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

type ProjectStatus string

const (
	ProjectStatusActive    ProjectStatus = "active"
	ProjectStatusCompleted ProjectStatus = "completed"
	ProjectStatusPaused    ProjectStatus = "paused"
	ProjectStatusCancelled ProjectStatus = "cancelled"
)

// Project holds the schema definition for the Project entity.
type Project struct {
	ent.Schema
}

// Fields of the Project.
func (Project) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("user_id", uuid.UUID{}),
		field.String("title").
			MaxLen(300),
		field.String("slug").
			MaxLen(200).
			Unique(),
		field.Text("description").
			Optional(),
		field.String("project_type").
			MaxLen(50).
			Default("Web Application"),
		field.Enum("status").
			Values("active", "completed", "paused", "cancelled").
			Default("active"),
		field.Time("start_date").
			Optional(),
		field.Time("end_date").
			Optional(),
		field.String("github_url").
			Optional().
			MaxLen(500),
		field.String("demo_url").
			Optional().
			MaxLen(500),
		field.String("documentation_url").
			Optional().
			MaxLen(500),
		field.String("thumbnail_url").
			Optional().
			MaxLen(500),
		field.Bool("is_featured").
			Default(false),
		field.Bool("is_public").
			Default(true),
		field.Int("view_count").
			Default(0),
		field.Int("star_count").
			Default(0),
		field.Int("sort_order").
			Default(0),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the Project.
func (Project) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("user", User.Type).
			Ref("projects").
			Unique(),
		edge.To("technologies", ProjectTechnology.Type),
		edge.To("detail", ProjectDetail.Type).
			Unique(),
		edge.To("images", ProjectImage.Type),
	}
}

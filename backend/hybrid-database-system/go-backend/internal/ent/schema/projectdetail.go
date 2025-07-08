package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ProjectDetail holds the schema definition for the ProjectDetail entity.
type ProjectDetail struct {
	ent.Schema
}

// Fields of the ProjectDetail.
func (ProjectDetail) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New),
		field.UUID("project_id", uuid.UUID{}),
		field.Text("full_description").
			Optional(),
		field.JSON("features", []string{}).
			Optional(),
		field.JSON("key_achievements", []string{}).
			Optional(),
		field.JSON("challenges_faced", []string{}).
			Optional(),
		field.JSON("lessons_learned", []string{}).
			Optional(),
		field.Text("technical_overview").
			Optional(),
		field.Text("installation_instructions").
			Optional(),
		field.Text("usage_instructions").
			Optional(),
		field.Text("api_documentation").
			Optional(),
		field.Text("deployment_notes").
			Optional(),
		field.Text("future_enhancements").
			Optional(),
		field.JSON("team_members", []string{}).
			Optional(),
		field.String("project_duration").
			MaxLen(100).
			Optional(),
		field.String("target_audience").
			MaxLen(200).
			Optional(),
		field.JSON("performance_metrics", map[string]interface{}{}).
			Optional(),
		field.JSON("testing_approach", map[string]interface{}{}).
			Optional(),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the ProjectDetail.
func (ProjectDetail) Edges() []ent.Edge {
	return []ent.Edge{
		edge.From("project", Project.Type).
			Ref("detail").
			Unique(),
	}
}

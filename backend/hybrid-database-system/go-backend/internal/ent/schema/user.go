package schema

import (
	"time"

	"entgo.io/ent"
	"entgo.io/ent/schema/edge"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// User holds the schema definition for the User entity.
type User struct {
	ent.Schema
}

// Fields of the User.
func (User) Fields() []ent.Field {
	return []ent.Field{
		field.UUID("id", uuid.UUID{}).
			Default(uuid.New).
			StorageKey("id"),
		field.String("username").
			Unique().
			MaxLen(50),
		field.String("email").
			Unique().
			MaxLen(255),
		field.String("password_hash").
			MaxLen(255),
		field.String("first_name").
			MaxLen(100),
		field.String("last_name").
			MaxLen(100),
		field.String("avatar_url").
			Optional().
			MaxLen(500),
		field.Text("bio").
			Optional(),
		field.Bool("is_active").
			Default(true),
		field.Bool("is_admin").
			Default(false),
		field.Time("last_login_at").
			Optional(),
		field.Time("created_at").
			Default(time.Now),
		field.Time("updated_at").
			Default(time.Now).
			UpdateDefault(time.Now),
	}
}

// Edges of the User.
func (User) Edges() []ent.Edge {
	return []ent.Edge{
		edge.To("personal_info", PersonalInfo.Type),
		edge.To("social_links", SocialLink.Type),
		edge.To("education", Education.Type),
		edge.To("work_experience", WorkExperience.Type),
		edge.To("projects", Project.Type),
		edge.To("blog_posts", BlogPost.Type),
		edge.To("blog_series", BlogSeries.Type),
		edge.To("ideas", Idea.Type),
		edge.To("research_projects", ResearchProject.Type),
		edge.To("publications", Publication.Type),
		edge.To("awards", Award.Type),
	}
}

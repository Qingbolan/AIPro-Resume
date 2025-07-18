// Code generated by ent, DO NOT EDIT.

package user

import (
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the user type in the database.
	Label = "user"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldUsername holds the string denoting the username field in the database.
	FieldUsername = "username"
	// FieldEmail holds the string denoting the email field in the database.
	FieldEmail = "email"
	// FieldPasswordHash holds the string denoting the password_hash field in the database.
	FieldPasswordHash = "password_hash"
	// FieldFirstName holds the string denoting the first_name field in the database.
	FieldFirstName = "first_name"
	// FieldLastName holds the string denoting the last_name field in the database.
	FieldLastName = "last_name"
	// FieldAvatarURL holds the string denoting the avatar_url field in the database.
	FieldAvatarURL = "avatar_url"
	// FieldBio holds the string denoting the bio field in the database.
	FieldBio = "bio"
	// FieldIsActive holds the string denoting the is_active field in the database.
	FieldIsActive = "is_active"
	// FieldIsAdmin holds the string denoting the is_admin field in the database.
	FieldIsAdmin = "is_admin"
	// FieldLastLoginAt holds the string denoting the last_login_at field in the database.
	FieldLastLoginAt = "last_login_at"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// EdgePersonalInfos holds the string denoting the personal_infos edge name in mutations.
	EdgePersonalInfos = "personal_infos"
	// EdgeEducations holds the string denoting the educations edge name in mutations.
	EdgeEducations = "educations"
	// EdgeWorkExperiences holds the string denoting the work_experiences edge name in mutations.
	EdgeWorkExperiences = "work_experiences"
	// EdgeProjects holds the string denoting the projects edge name in mutations.
	EdgeProjects = "projects"
	// EdgeBlogPosts holds the string denoting the blog_posts edge name in mutations.
	EdgeBlogPosts = "blog_posts"
	// EdgeIdeas holds the string denoting the ideas edge name in mutations.
	EdgeIdeas = "ideas"
	// EdgeResearchProjects holds the string denoting the research_projects edge name in mutations.
	EdgeResearchProjects = "research_projects"
	// EdgePublications holds the string denoting the publications edge name in mutations.
	EdgePublications = "publications"
	// EdgeAwards holds the string denoting the awards edge name in mutations.
	EdgeAwards = "awards"
	// EdgeRecentUpdates holds the string denoting the recent_updates edge name in mutations.
	EdgeRecentUpdates = "recent_updates"
	// Table holds the table name of the user in the database.
	Table = "users"
	// PersonalInfosTable is the table that holds the personal_infos relation/edge.
	PersonalInfosTable = "personal_info"
	// PersonalInfosInverseTable is the table name for the PersonalInfo entity.
	// It exists in this package in order to avoid circular dependency with the "personalinfo" package.
	PersonalInfosInverseTable = "personal_info"
	// PersonalInfosColumn is the table column denoting the personal_infos relation/edge.
	PersonalInfosColumn = "user_id"
	// EducationsTable is the table that holds the educations relation/edge.
	EducationsTable = "education"
	// EducationsInverseTable is the table name for the Education entity.
	// It exists in this package in order to avoid circular dependency with the "education" package.
	EducationsInverseTable = "education"
	// EducationsColumn is the table column denoting the educations relation/edge.
	EducationsColumn = "user_id"
	// WorkExperiencesTable is the table that holds the work_experiences relation/edge.
	WorkExperiencesTable = "work_experience"
	// WorkExperiencesInverseTable is the table name for the WorkExperience entity.
	// It exists in this package in order to avoid circular dependency with the "workexperience" package.
	WorkExperiencesInverseTable = "work_experience"
	// WorkExperiencesColumn is the table column denoting the work_experiences relation/edge.
	WorkExperiencesColumn = "user_id"
	// ProjectsTable is the table that holds the projects relation/edge.
	ProjectsTable = "projects"
	// ProjectsInverseTable is the table name for the Project entity.
	// It exists in this package in order to avoid circular dependency with the "project" package.
	ProjectsInverseTable = "projects"
	// ProjectsColumn is the table column denoting the projects relation/edge.
	ProjectsColumn = "user_id"
	// BlogPostsTable is the table that holds the blog_posts relation/edge.
	BlogPostsTable = "blog_posts"
	// BlogPostsInverseTable is the table name for the BlogPost entity.
	// It exists in this package in order to avoid circular dependency with the "blogpost" package.
	BlogPostsInverseTable = "blog_posts"
	// BlogPostsColumn is the table column denoting the blog_posts relation/edge.
	BlogPostsColumn = "user_id"
	// IdeasTable is the table that holds the ideas relation/edge.
	IdeasTable = "ideas"
	// IdeasInverseTable is the table name for the Idea entity.
	// It exists in this package in order to avoid circular dependency with the "idea" package.
	IdeasInverseTable = "ideas"
	// IdeasColumn is the table column denoting the ideas relation/edge.
	IdeasColumn = "user_id"
	// ResearchProjectsTable is the table that holds the research_projects relation/edge.
	ResearchProjectsTable = "research_projects"
	// ResearchProjectsInverseTable is the table name for the ResearchProject entity.
	// It exists in this package in order to avoid circular dependency with the "researchproject" package.
	ResearchProjectsInverseTable = "research_projects"
	// ResearchProjectsColumn is the table column denoting the research_projects relation/edge.
	ResearchProjectsColumn = "user_id"
	// PublicationsTable is the table that holds the publications relation/edge.
	PublicationsTable = "publications"
	// PublicationsInverseTable is the table name for the Publication entity.
	// It exists in this package in order to avoid circular dependency with the "publication" package.
	PublicationsInverseTable = "publications"
	// PublicationsColumn is the table column denoting the publications relation/edge.
	PublicationsColumn = "user_id"
	// AwardsTable is the table that holds the awards relation/edge.
	AwardsTable = "awards"
	// AwardsInverseTable is the table name for the Award entity.
	// It exists in this package in order to avoid circular dependency with the "award" package.
	AwardsInverseTable = "awards"
	// AwardsColumn is the table column denoting the awards relation/edge.
	AwardsColumn = "user_id"
	// RecentUpdatesTable is the table that holds the recent_updates relation/edge.
	RecentUpdatesTable = "recent_updates"
	// RecentUpdatesInverseTable is the table name for the RecentUpdate entity.
	// It exists in this package in order to avoid circular dependency with the "recentupdate" package.
	RecentUpdatesInverseTable = "recent_updates"
	// RecentUpdatesColumn is the table column denoting the recent_updates relation/edge.
	RecentUpdatesColumn = "user_id"
)

// Columns holds all SQL columns for user fields.
var Columns = []string{
	FieldID,
	FieldUsername,
	FieldEmail,
	FieldPasswordHash,
	FieldFirstName,
	FieldLastName,
	FieldAvatarURL,
	FieldBio,
	FieldIsActive,
	FieldIsAdmin,
	FieldLastLoginAt,
	FieldCreatedAt,
	FieldUpdatedAt,
}

// ValidColumn reports if the column name is valid (part of the table columns).
func ValidColumn(column string) bool {
	for i := range Columns {
		if column == Columns[i] {
			return true
		}
	}
	return false
}

var (
	// UsernameValidator is a validator for the "username" field. It is called by the builders before save.
	UsernameValidator func(string) error
	// EmailValidator is a validator for the "email" field. It is called by the builders before save.
	EmailValidator func(string) error
	// PasswordHashValidator is a validator for the "password_hash" field. It is called by the builders before save.
	PasswordHashValidator func(string) error
	// FirstNameValidator is a validator for the "first_name" field. It is called by the builders before save.
	FirstNameValidator func(string) error
	// LastNameValidator is a validator for the "last_name" field. It is called by the builders before save.
	LastNameValidator func(string) error
	// AvatarURLValidator is a validator for the "avatar_url" field. It is called by the builders before save.
	AvatarURLValidator func(string) error
	// DefaultIsActive holds the default value on creation for the "is_active" field.
	DefaultIsActive bool
	// DefaultIsAdmin holds the default value on creation for the "is_admin" field.
	DefaultIsAdmin bool
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// UpdateDefaultUpdatedAt holds the default value on update for the "updated_at" field.
	UpdateDefaultUpdatedAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)

// OrderOption defines the ordering options for the User queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByUsername orders the results by the username field.
func ByUsername(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUsername, opts...).ToFunc()
}

// ByEmail orders the results by the email field.
func ByEmail(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldEmail, opts...).ToFunc()
}

// ByPasswordHash orders the results by the password_hash field.
func ByPasswordHash(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldPasswordHash, opts...).ToFunc()
}

// ByFirstName orders the results by the first_name field.
func ByFirstName(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldFirstName, opts...).ToFunc()
}

// ByLastName orders the results by the last_name field.
func ByLastName(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLastName, opts...).ToFunc()
}

// ByAvatarURL orders the results by the avatar_url field.
func ByAvatarURL(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldAvatarURL, opts...).ToFunc()
}

// ByBio orders the results by the bio field.
func ByBio(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldBio, opts...).ToFunc()
}

// ByIsActive orders the results by the is_active field.
func ByIsActive(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldIsActive, opts...).ToFunc()
}

// ByIsAdmin orders the results by the is_admin field.
func ByIsAdmin(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldIsAdmin, opts...).ToFunc()
}

// ByLastLoginAt orders the results by the last_login_at field.
func ByLastLoginAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLastLoginAt, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByPersonalInfosCount orders the results by personal_infos count.
func ByPersonalInfosCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newPersonalInfosStep(), opts...)
	}
}

// ByPersonalInfos orders the results by personal_infos terms.
func ByPersonalInfos(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newPersonalInfosStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByEducationsCount orders the results by educations count.
func ByEducationsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newEducationsStep(), opts...)
	}
}

// ByEducations orders the results by educations terms.
func ByEducations(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newEducationsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByWorkExperiencesCount orders the results by work_experiences count.
func ByWorkExperiencesCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newWorkExperiencesStep(), opts...)
	}
}

// ByWorkExperiences orders the results by work_experiences terms.
func ByWorkExperiences(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newWorkExperiencesStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByProjectsCount orders the results by projects count.
func ByProjectsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newProjectsStep(), opts...)
	}
}

// ByProjects orders the results by projects terms.
func ByProjects(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newProjectsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByBlogPostsCount orders the results by blog_posts count.
func ByBlogPostsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newBlogPostsStep(), opts...)
	}
}

// ByBlogPosts orders the results by blog_posts terms.
func ByBlogPosts(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newBlogPostsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByIdeasCount orders the results by ideas count.
func ByIdeasCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newIdeasStep(), opts...)
	}
}

// ByIdeas orders the results by ideas terms.
func ByIdeas(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newIdeasStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByResearchProjectsCount orders the results by research_projects count.
func ByResearchProjectsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newResearchProjectsStep(), opts...)
	}
}

// ByResearchProjects orders the results by research_projects terms.
func ByResearchProjects(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newResearchProjectsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByPublicationsCount orders the results by publications count.
func ByPublicationsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newPublicationsStep(), opts...)
	}
}

// ByPublications orders the results by publications terms.
func ByPublications(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newPublicationsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByAwardsCount orders the results by awards count.
func ByAwardsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newAwardsStep(), opts...)
	}
}

// ByAwards orders the results by awards terms.
func ByAwards(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newAwardsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByRecentUpdatesCount orders the results by recent_updates count.
func ByRecentUpdatesCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newRecentUpdatesStep(), opts...)
	}
}

// ByRecentUpdates orders the results by recent_updates terms.
func ByRecentUpdates(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newRecentUpdatesStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}
func newPersonalInfosStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(PersonalInfosInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, PersonalInfosTable, PersonalInfosColumn),
	)
}
func newEducationsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(EducationsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, EducationsTable, EducationsColumn),
	)
}
func newWorkExperiencesStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(WorkExperiencesInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, WorkExperiencesTable, WorkExperiencesColumn),
	)
}
func newProjectsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(ProjectsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, ProjectsTable, ProjectsColumn),
	)
}
func newBlogPostsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(BlogPostsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, BlogPostsTable, BlogPostsColumn),
	)
}
func newIdeasStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(IdeasInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, IdeasTable, IdeasColumn),
	)
}
func newResearchProjectsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(ResearchProjectsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, ResearchProjectsTable, ResearchProjectsColumn),
	)
}
func newPublicationsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(PublicationsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, PublicationsTable, PublicationsColumn),
	)
}
func newAwardsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(AwardsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, AwardsTable, AwardsColumn),
	)
}
func newRecentUpdatesStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(RecentUpdatesInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, RecentUpdatesTable, RecentUpdatesColumn),
	)
}

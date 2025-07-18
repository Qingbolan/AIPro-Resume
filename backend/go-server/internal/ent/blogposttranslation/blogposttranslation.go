// Code generated by ent, DO NOT EDIT.

package blogposttranslation

import (
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the blogposttranslation type in the database.
	Label = "blog_post_translation"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldBlogPostID holds the string denoting the blog_post_id field in the database.
	FieldBlogPostID = "blog_post_id"
	// FieldLanguageCode holds the string denoting the language_code field in the database.
	FieldLanguageCode = "language_code"
	// FieldTitle holds the string denoting the title field in the database.
	FieldTitle = "title"
	// FieldExcerpt holds the string denoting the excerpt field in the database.
	FieldExcerpt = "excerpt"
	// FieldContent holds the string denoting the content field in the database.
	FieldContent = "content"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// EdgeBlogPost holds the string denoting the blog_post edge name in mutations.
	EdgeBlogPost = "blog_post"
	// EdgeLanguage holds the string denoting the language edge name in mutations.
	EdgeLanguage = "language"
	// LanguageFieldID holds the string denoting the ID field of the Language.
	LanguageFieldID = "code"
	// Table holds the table name of the blogposttranslation in the database.
	Table = "blog_post_translations"
	// BlogPostTable is the table that holds the blog_post relation/edge.
	BlogPostTable = "blog_post_translations"
	// BlogPostInverseTable is the table name for the BlogPost entity.
	// It exists in this package in order to avoid circular dependency with the "blogpost" package.
	BlogPostInverseTable = "blog_posts"
	// BlogPostColumn is the table column denoting the blog_post relation/edge.
	BlogPostColumn = "blog_post_id"
	// LanguageTable is the table that holds the language relation/edge.
	LanguageTable = "blog_post_translations"
	// LanguageInverseTable is the table name for the Language entity.
	// It exists in this package in order to avoid circular dependency with the "language" package.
	LanguageInverseTable = "languages"
	// LanguageColumn is the table column denoting the language relation/edge.
	LanguageColumn = "language_code"
)

// Columns holds all SQL columns for blogposttranslation fields.
var Columns = []string{
	FieldID,
	FieldBlogPostID,
	FieldLanguageCode,
	FieldTitle,
	FieldExcerpt,
	FieldContent,
	FieldCreatedAt,
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
	// LanguageCodeValidator is a validator for the "language_code" field. It is called by the builders before save.
	LanguageCodeValidator func(string) error
	// TitleValidator is a validator for the "title" field. It is called by the builders before save.
	TitleValidator func(string) error
	// ContentValidator is a validator for the "content" field. It is called by the builders before save.
	ContentValidator func(string) error
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)

// OrderOption defines the ordering options for the BlogPostTranslation queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByBlogPostID orders the results by the blog_post_id field.
func ByBlogPostID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldBlogPostID, opts...).ToFunc()
}

// ByLanguageCode orders the results by the language_code field.
func ByLanguageCode(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLanguageCode, opts...).ToFunc()
}

// ByTitle orders the results by the title field.
func ByTitle(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldTitle, opts...).ToFunc()
}

// ByExcerpt orders the results by the excerpt field.
func ByExcerpt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldExcerpt, opts...).ToFunc()
}

// ByContent orders the results by the content field.
func ByContent(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldContent, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByBlogPostField orders the results by blog_post field.
func ByBlogPostField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newBlogPostStep(), sql.OrderByField(field, opts...))
	}
}

// ByLanguageField orders the results by language field.
func ByLanguageField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newLanguageStep(), sql.OrderByField(field, opts...))
	}
}
func newBlogPostStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(BlogPostInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, BlogPostTable, BlogPostColumn),
	)
}
func newLanguageStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(LanguageInverseTable, LanguageFieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, LanguageTable, LanguageColumn),
	)
}

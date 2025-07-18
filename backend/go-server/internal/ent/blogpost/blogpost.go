// Code generated by ent, DO NOT EDIT.

package blogpost

import (
	"fmt"
	"time"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"github.com/google/uuid"
)

const (
	// Label holds the string label denoting the blogpost type in the database.
	Label = "blog_post"
	// FieldID holds the string denoting the id field in the database.
	FieldID = "id"
	// FieldUserID holds the string denoting the user_id field in the database.
	FieldUserID = "user_id"
	// FieldCategoryID holds the string denoting the category_id field in the database.
	FieldCategoryID = "category_id"
	// FieldSeriesID holds the string denoting the series_id field in the database.
	FieldSeriesID = "series_id"
	// FieldIdeasID holds the string denoting the ideas_id field in the database.
	FieldIdeasID = "ideas_id"
	// FieldTitle holds the string denoting the title field in the database.
	FieldTitle = "title"
	// FieldSlug holds the string denoting the slug field in the database.
	FieldSlug = "slug"
	// FieldExcerpt holds the string denoting the excerpt field in the database.
	FieldExcerpt = "excerpt"
	// FieldContent holds the string denoting the content field in the database.
	FieldContent = "content"
	// FieldContentType holds the string denoting the content_type field in the database.
	FieldContentType = "content_type"
	// FieldStatus holds the string denoting the status field in the database.
	FieldStatus = "status"
	// FieldIsFeatured holds the string denoting the is_featured field in the database.
	FieldIsFeatured = "is_featured"
	// FieldFeaturedImageURL holds the string denoting the featured_image_url field in the database.
	FieldFeaturedImageURL = "featured_image_url"
	// FieldReadingTimeMinutes holds the string denoting the reading_time_minutes field in the database.
	FieldReadingTimeMinutes = "reading_time_minutes"
	// FieldViewCount holds the string denoting the view_count field in the database.
	FieldViewCount = "view_count"
	// FieldLikeCount holds the string denoting the like_count field in the database.
	FieldLikeCount = "like_count"
	// FieldCommentCount holds the string denoting the comment_count field in the database.
	FieldCommentCount = "comment_count"
	// FieldPublishedAt holds the string denoting the published_at field in the database.
	FieldPublishedAt = "published_at"
	// FieldSeriesOrder holds the string denoting the series_order field in the database.
	FieldSeriesOrder = "series_order"
	// FieldCreatedAt holds the string denoting the created_at field in the database.
	FieldCreatedAt = "created_at"
	// FieldUpdatedAt holds the string denoting the updated_at field in the database.
	FieldUpdatedAt = "updated_at"
	// EdgeUser holds the string denoting the user edge name in mutations.
	EdgeUser = "user"
	// EdgeCategory holds the string denoting the category edge name in mutations.
	EdgeCategory = "category"
	// EdgeSeries holds the string denoting the series edge name in mutations.
	EdgeSeries = "series"
	// EdgeIdeas holds the string denoting the ideas edge name in mutations.
	EdgeIdeas = "ideas"
	// EdgeTags holds the string denoting the tags edge name in mutations.
	EdgeTags = "tags"
	// EdgeTranslations holds the string denoting the translations edge name in mutations.
	EdgeTranslations = "translations"
	// EdgeComments holds the string denoting the comments edge name in mutations.
	EdgeComments = "comments"
	// EdgeBlogPostTags holds the string denoting the blog_post_tags edge name in mutations.
	EdgeBlogPostTags = "blog_post_tags"
	// Table holds the table name of the blogpost in the database.
	Table = "blog_posts"
	// UserTable is the table that holds the user relation/edge.
	UserTable = "blog_posts"
	// UserInverseTable is the table name for the User entity.
	// It exists in this package in order to avoid circular dependency with the "user" package.
	UserInverseTable = "users"
	// UserColumn is the table column denoting the user relation/edge.
	UserColumn = "user_id"
	// CategoryTable is the table that holds the category relation/edge.
	CategoryTable = "blog_posts"
	// CategoryInverseTable is the table name for the BlogCategory entity.
	// It exists in this package in order to avoid circular dependency with the "blogcategory" package.
	CategoryInverseTable = "blog_categories"
	// CategoryColumn is the table column denoting the category relation/edge.
	CategoryColumn = "category_id"
	// SeriesTable is the table that holds the series relation/edge.
	SeriesTable = "blog_posts"
	// SeriesInverseTable is the table name for the BlogSeries entity.
	// It exists in this package in order to avoid circular dependency with the "blogseries" package.
	SeriesInverseTable = "blog_series"
	// SeriesColumn is the table column denoting the series relation/edge.
	SeriesColumn = "series_id"
	// IdeasTable is the table that holds the ideas relation/edge.
	IdeasTable = "blog_posts"
	// IdeasInverseTable is the table name for the Idea entity.
	// It exists in this package in order to avoid circular dependency with the "idea" package.
	IdeasInverseTable = "ideas"
	// IdeasColumn is the table column denoting the ideas relation/edge.
	IdeasColumn = "ideas_id"
	// TagsTable is the table that holds the tags relation/edge. The primary key declared below.
	TagsTable = "blog_post_tags"
	// TagsInverseTable is the table name for the BlogTag entity.
	// It exists in this package in order to avoid circular dependency with the "blogtag" package.
	TagsInverseTable = "blog_tags"
	// TranslationsTable is the table that holds the translations relation/edge.
	TranslationsTable = "blog_post_translations"
	// TranslationsInverseTable is the table name for the BlogPostTranslation entity.
	// It exists in this package in order to avoid circular dependency with the "blogposttranslation" package.
	TranslationsInverseTable = "blog_post_translations"
	// TranslationsColumn is the table column denoting the translations relation/edge.
	TranslationsColumn = "blog_post_id"
	// CommentsTable is the table that holds the comments relation/edge.
	CommentsTable = "blog_comments"
	// CommentsInverseTable is the table name for the BlogComment entity.
	// It exists in this package in order to avoid circular dependency with the "blogcomment" package.
	CommentsInverseTable = "blog_comments"
	// CommentsColumn is the table column denoting the comments relation/edge.
	CommentsColumn = "blog_post_id"
	// BlogPostTagsTable is the table that holds the blog_post_tags relation/edge.
	BlogPostTagsTable = "blog_post_tags"
	// BlogPostTagsInverseTable is the table name for the BlogPostTag entity.
	// It exists in this package in order to avoid circular dependency with the "blogposttag" package.
	BlogPostTagsInverseTable = "blog_post_tags"
	// BlogPostTagsColumn is the table column denoting the blog_post_tags relation/edge.
	BlogPostTagsColumn = "blog_post_id"
)

// Columns holds all SQL columns for blogpost fields.
var Columns = []string{
	FieldID,
	FieldUserID,
	FieldCategoryID,
	FieldSeriesID,
	FieldIdeasID,
	FieldTitle,
	FieldSlug,
	FieldExcerpt,
	FieldContent,
	FieldContentType,
	FieldStatus,
	FieldIsFeatured,
	FieldFeaturedImageURL,
	FieldReadingTimeMinutes,
	FieldViewCount,
	FieldLikeCount,
	FieldCommentCount,
	FieldPublishedAt,
	FieldSeriesOrder,
	FieldCreatedAt,
	FieldUpdatedAt,
}

var (
	// TagsPrimaryKey and TagsColumn2 are the table columns denoting the
	// primary key for the tags relation (M2M).
	TagsPrimaryKey = []string{"blog_post_id", "blog_tag_id"}
)

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
	// TitleValidator is a validator for the "title" field. It is called by the builders before save.
	TitleValidator func(string) error
	// SlugValidator is a validator for the "slug" field. It is called by the builders before save.
	SlugValidator func(string) error
	// ContentValidator is a validator for the "content" field. It is called by the builders before save.
	ContentValidator func(string) error
	// DefaultIsFeatured holds the default value on creation for the "is_featured" field.
	DefaultIsFeatured bool
	// FeaturedImageURLValidator is a validator for the "featured_image_url" field. It is called by the builders before save.
	FeaturedImageURLValidator func(string) error
	// DefaultViewCount holds the default value on creation for the "view_count" field.
	DefaultViewCount int
	// DefaultLikeCount holds the default value on creation for the "like_count" field.
	DefaultLikeCount int
	// DefaultCommentCount holds the default value on creation for the "comment_count" field.
	DefaultCommentCount int
	// DefaultCreatedAt holds the default value on creation for the "created_at" field.
	DefaultCreatedAt func() time.Time
	// DefaultUpdatedAt holds the default value on creation for the "updated_at" field.
	DefaultUpdatedAt func() time.Time
	// UpdateDefaultUpdatedAt holds the default value on update for the "updated_at" field.
	UpdateDefaultUpdatedAt func() time.Time
	// DefaultID holds the default value on creation for the "id" field.
	DefaultID func() uuid.UUID
)

// ContentType defines the type for the "content_type" enum field.
type ContentType string

// ContentTypeArticle is the default value of the ContentType enum.
const DefaultContentType = ContentTypeArticle

// ContentType values.
const (
	ContentTypeArticle ContentType = "article"
	ContentTypeVlog    ContentType = "vlog"
	ContentTypeEpisode ContentType = "episode"
)

func (ct ContentType) String() string {
	return string(ct)
}

// ContentTypeValidator is a validator for the "content_type" field enum values. It is called by the builders before save.
func ContentTypeValidator(ct ContentType) error {
	switch ct {
	case ContentTypeArticle, ContentTypeVlog, ContentTypeEpisode:
		return nil
	default:
		return fmt.Errorf("blogpost: invalid enum value for content_type field: %q", ct)
	}
}

// Status defines the type for the "status" enum field.
type Status string

// StatusDraft is the default value of the Status enum.
const DefaultStatus = StatusDraft

// Status values.
const (
	StatusDraft     Status = "draft"
	StatusPublished Status = "published"
	StatusArchived  Status = "archived"
)

func (s Status) String() string {
	return string(s)
}

// StatusValidator is a validator for the "status" field enum values. It is called by the builders before save.
func StatusValidator(s Status) error {
	switch s {
	case StatusDraft, StatusPublished, StatusArchived:
		return nil
	default:
		return fmt.Errorf("blogpost: invalid enum value for status field: %q", s)
	}
}

// OrderOption defines the ordering options for the BlogPost queries.
type OrderOption func(*sql.Selector)

// ByID orders the results by the id field.
func ByID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldID, opts...).ToFunc()
}

// ByUserID orders the results by the user_id field.
func ByUserID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUserID, opts...).ToFunc()
}

// ByCategoryID orders the results by the category_id field.
func ByCategoryID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCategoryID, opts...).ToFunc()
}

// BySeriesID orders the results by the series_id field.
func BySeriesID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSeriesID, opts...).ToFunc()
}

// ByIdeasID orders the results by the ideas_id field.
func ByIdeasID(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldIdeasID, opts...).ToFunc()
}

// ByTitle orders the results by the title field.
func ByTitle(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldTitle, opts...).ToFunc()
}

// BySlug orders the results by the slug field.
func BySlug(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSlug, opts...).ToFunc()
}

// ByExcerpt orders the results by the excerpt field.
func ByExcerpt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldExcerpt, opts...).ToFunc()
}

// ByContent orders the results by the content field.
func ByContent(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldContent, opts...).ToFunc()
}

// ByContentType orders the results by the content_type field.
func ByContentType(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldContentType, opts...).ToFunc()
}

// ByStatus orders the results by the status field.
func ByStatus(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldStatus, opts...).ToFunc()
}

// ByIsFeatured orders the results by the is_featured field.
func ByIsFeatured(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldIsFeatured, opts...).ToFunc()
}

// ByFeaturedImageURL orders the results by the featured_image_url field.
func ByFeaturedImageURL(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldFeaturedImageURL, opts...).ToFunc()
}

// ByReadingTimeMinutes orders the results by the reading_time_minutes field.
func ByReadingTimeMinutes(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldReadingTimeMinutes, opts...).ToFunc()
}

// ByViewCount orders the results by the view_count field.
func ByViewCount(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldViewCount, opts...).ToFunc()
}

// ByLikeCount orders the results by the like_count field.
func ByLikeCount(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldLikeCount, opts...).ToFunc()
}

// ByCommentCount orders the results by the comment_count field.
func ByCommentCount(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCommentCount, opts...).ToFunc()
}

// ByPublishedAt orders the results by the published_at field.
func ByPublishedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldPublishedAt, opts...).ToFunc()
}

// BySeriesOrder orders the results by the series_order field.
func BySeriesOrder(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldSeriesOrder, opts...).ToFunc()
}

// ByCreatedAt orders the results by the created_at field.
func ByCreatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldCreatedAt, opts...).ToFunc()
}

// ByUpdatedAt orders the results by the updated_at field.
func ByUpdatedAt(opts ...sql.OrderTermOption) OrderOption {
	return sql.OrderByField(FieldUpdatedAt, opts...).ToFunc()
}

// ByUserField orders the results by user field.
func ByUserField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newUserStep(), sql.OrderByField(field, opts...))
	}
}

// ByCategoryField orders the results by category field.
func ByCategoryField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newCategoryStep(), sql.OrderByField(field, opts...))
	}
}

// BySeriesField orders the results by series field.
func BySeriesField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newSeriesStep(), sql.OrderByField(field, opts...))
	}
}

// ByIdeasField orders the results by ideas field.
func ByIdeasField(field string, opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newIdeasStep(), sql.OrderByField(field, opts...))
	}
}

// ByTagsCount orders the results by tags count.
func ByTagsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newTagsStep(), opts...)
	}
}

// ByTags orders the results by tags terms.
func ByTags(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newTagsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByTranslationsCount orders the results by translations count.
func ByTranslationsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newTranslationsStep(), opts...)
	}
}

// ByTranslations orders the results by translations terms.
func ByTranslations(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newTranslationsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByCommentsCount orders the results by comments count.
func ByCommentsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newCommentsStep(), opts...)
	}
}

// ByComments orders the results by comments terms.
func ByComments(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newCommentsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}

// ByBlogPostTagsCount orders the results by blog_post_tags count.
func ByBlogPostTagsCount(opts ...sql.OrderTermOption) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborsCount(s, newBlogPostTagsStep(), opts...)
	}
}

// ByBlogPostTags orders the results by blog_post_tags terms.
func ByBlogPostTags(term sql.OrderTerm, terms ...sql.OrderTerm) OrderOption {
	return func(s *sql.Selector) {
		sqlgraph.OrderByNeighborTerms(s, newBlogPostTagsStep(), append([]sql.OrderTerm{term}, terms...)...)
	}
}
func newUserStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(UserInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, UserTable, UserColumn),
	)
}
func newCategoryStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(CategoryInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, CategoryTable, CategoryColumn),
	)
}
func newSeriesStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(SeriesInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, SeriesTable, SeriesColumn),
	)
}
func newIdeasStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(IdeasInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2O, true, IdeasTable, IdeasColumn),
	)
}
func newTagsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(TagsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.M2M, false, TagsTable, TagsPrimaryKey...),
	)
}
func newTranslationsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(TranslationsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, TranslationsTable, TranslationsColumn),
	)
}
func newCommentsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(CommentsInverseTable, FieldID),
		sqlgraph.Edge(sqlgraph.O2M, false, CommentsTable, CommentsColumn),
	)
}
func newBlogPostTagsStep() *sqlgraph.Step {
	return sqlgraph.NewStep(
		sqlgraph.From(Table, FieldID),
		sqlgraph.To(BlogPostTagsInverseTable, BlogPostTagsColumn),
		sqlgraph.Edge(sqlgraph.O2M, true, BlogPostTagsTable, BlogPostTagsColumn),
	)
}

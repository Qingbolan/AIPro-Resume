// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/blogseries"
	"silan-backend/internal/ent/blogseriestranslation"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogSeriesTranslationUpdate is the builder for updating BlogSeriesTranslation entities.
type BlogSeriesTranslationUpdate struct {
	config
	hooks    []Hook
	mutation *BlogSeriesTranslationMutation
}

// Where appends a list predicates to the BlogSeriesTranslationUpdate builder.
func (bstu *BlogSeriesTranslationUpdate) Where(ps ...predicate.BlogSeriesTranslation) *BlogSeriesTranslationUpdate {
	bstu.mutation.Where(ps...)
	return bstu
}

// SetBlogSeriesID sets the "blog_series_id" field.
func (bstu *BlogSeriesTranslationUpdate) SetBlogSeriesID(u uuid.UUID) *BlogSeriesTranslationUpdate {
	bstu.mutation.SetBlogSeriesID(u)
	return bstu
}

// SetNillableBlogSeriesID sets the "blog_series_id" field if the given value is not nil.
func (bstu *BlogSeriesTranslationUpdate) SetNillableBlogSeriesID(u *uuid.UUID) *BlogSeriesTranslationUpdate {
	if u != nil {
		bstu.SetBlogSeriesID(*u)
	}
	return bstu
}

// SetLanguageCode sets the "language_code" field.
func (bstu *BlogSeriesTranslationUpdate) SetLanguageCode(s string) *BlogSeriesTranslationUpdate {
	bstu.mutation.SetLanguageCode(s)
	return bstu
}

// SetNillableLanguageCode sets the "language_code" field if the given value is not nil.
func (bstu *BlogSeriesTranslationUpdate) SetNillableLanguageCode(s *string) *BlogSeriesTranslationUpdate {
	if s != nil {
		bstu.SetLanguageCode(*s)
	}
	return bstu
}

// SetTitle sets the "title" field.
func (bstu *BlogSeriesTranslationUpdate) SetTitle(s string) *BlogSeriesTranslationUpdate {
	bstu.mutation.SetTitle(s)
	return bstu
}

// SetNillableTitle sets the "title" field if the given value is not nil.
func (bstu *BlogSeriesTranslationUpdate) SetNillableTitle(s *string) *BlogSeriesTranslationUpdate {
	if s != nil {
		bstu.SetTitle(*s)
	}
	return bstu
}

// SetDescription sets the "description" field.
func (bstu *BlogSeriesTranslationUpdate) SetDescription(s string) *BlogSeriesTranslationUpdate {
	bstu.mutation.SetDescription(s)
	return bstu
}

// SetNillableDescription sets the "description" field if the given value is not nil.
func (bstu *BlogSeriesTranslationUpdate) SetNillableDescription(s *string) *BlogSeriesTranslationUpdate {
	if s != nil {
		bstu.SetDescription(*s)
	}
	return bstu
}

// ClearDescription clears the value of the "description" field.
func (bstu *BlogSeriesTranslationUpdate) ClearDescription() *BlogSeriesTranslationUpdate {
	bstu.mutation.ClearDescription()
	return bstu
}

// SetBlogSeries sets the "blog_series" edge to the BlogSeries entity.
func (bstu *BlogSeriesTranslationUpdate) SetBlogSeries(b *BlogSeries) *BlogSeriesTranslationUpdate {
	return bstu.SetBlogSeriesID(b.ID)
}

// SetLanguageID sets the "language" edge to the Language entity by ID.
func (bstu *BlogSeriesTranslationUpdate) SetLanguageID(id string) *BlogSeriesTranslationUpdate {
	bstu.mutation.SetLanguageID(id)
	return bstu
}

// SetLanguage sets the "language" edge to the Language entity.
func (bstu *BlogSeriesTranslationUpdate) SetLanguage(l *Language) *BlogSeriesTranslationUpdate {
	return bstu.SetLanguageID(l.ID)
}

// Mutation returns the BlogSeriesTranslationMutation object of the builder.
func (bstu *BlogSeriesTranslationUpdate) Mutation() *BlogSeriesTranslationMutation {
	return bstu.mutation
}

// ClearBlogSeries clears the "blog_series" edge to the BlogSeries entity.
func (bstu *BlogSeriesTranslationUpdate) ClearBlogSeries() *BlogSeriesTranslationUpdate {
	bstu.mutation.ClearBlogSeries()
	return bstu
}

// ClearLanguage clears the "language" edge to the Language entity.
func (bstu *BlogSeriesTranslationUpdate) ClearLanguage() *BlogSeriesTranslationUpdate {
	bstu.mutation.ClearLanguage()
	return bstu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (bstu *BlogSeriesTranslationUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, bstu.sqlSave, bstu.mutation, bstu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (bstu *BlogSeriesTranslationUpdate) SaveX(ctx context.Context) int {
	affected, err := bstu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (bstu *BlogSeriesTranslationUpdate) Exec(ctx context.Context) error {
	_, err := bstu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (bstu *BlogSeriesTranslationUpdate) ExecX(ctx context.Context) {
	if err := bstu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (bstu *BlogSeriesTranslationUpdate) check() error {
	if v, ok := bstu.mutation.LanguageCode(); ok {
		if err := blogseriestranslation.LanguageCodeValidator(v); err != nil {
			return &ValidationError{Name: "language_code", err: fmt.Errorf(`ent: validator failed for field "BlogSeriesTranslation.language_code": %w`, err)}
		}
	}
	if v, ok := bstu.mutation.Title(); ok {
		if err := blogseriestranslation.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "BlogSeriesTranslation.title": %w`, err)}
		}
	}
	if bstu.mutation.BlogSeriesCleared() && len(bstu.mutation.BlogSeriesIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogSeriesTranslation.blog_series"`)
	}
	if bstu.mutation.LanguageCleared() && len(bstu.mutation.LanguageIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogSeriesTranslation.language"`)
	}
	return nil
}

func (bstu *BlogSeriesTranslationUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := bstu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(blogseriestranslation.Table, blogseriestranslation.Columns, sqlgraph.NewFieldSpec(blogseriestranslation.FieldID, field.TypeUUID))
	if ps := bstu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := bstu.mutation.Title(); ok {
		_spec.SetField(blogseriestranslation.FieldTitle, field.TypeString, value)
	}
	if value, ok := bstu.mutation.Description(); ok {
		_spec.SetField(blogseriestranslation.FieldDescription, field.TypeString, value)
	}
	if bstu.mutation.DescriptionCleared() {
		_spec.ClearField(blogseriestranslation.FieldDescription, field.TypeString)
	}
	if bstu.mutation.BlogSeriesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.BlogSeriesTable,
			Columns: []string{blogseriestranslation.BlogSeriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogseries.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bstu.mutation.BlogSeriesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.BlogSeriesTable,
			Columns: []string{blogseriestranslation.BlogSeriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogseries.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if bstu.mutation.LanguageCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.LanguageTable,
			Columns: []string{blogseriestranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bstu.mutation.LanguageIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.LanguageTable,
			Columns: []string{blogseriestranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, bstu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{blogseriestranslation.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	bstu.mutation.done = true
	return n, nil
}

// BlogSeriesTranslationUpdateOne is the builder for updating a single BlogSeriesTranslation entity.
type BlogSeriesTranslationUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *BlogSeriesTranslationMutation
}

// SetBlogSeriesID sets the "blog_series_id" field.
func (bstuo *BlogSeriesTranslationUpdateOne) SetBlogSeriesID(u uuid.UUID) *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.SetBlogSeriesID(u)
	return bstuo
}

// SetNillableBlogSeriesID sets the "blog_series_id" field if the given value is not nil.
func (bstuo *BlogSeriesTranslationUpdateOne) SetNillableBlogSeriesID(u *uuid.UUID) *BlogSeriesTranslationUpdateOne {
	if u != nil {
		bstuo.SetBlogSeriesID(*u)
	}
	return bstuo
}

// SetLanguageCode sets the "language_code" field.
func (bstuo *BlogSeriesTranslationUpdateOne) SetLanguageCode(s string) *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.SetLanguageCode(s)
	return bstuo
}

// SetNillableLanguageCode sets the "language_code" field if the given value is not nil.
func (bstuo *BlogSeriesTranslationUpdateOne) SetNillableLanguageCode(s *string) *BlogSeriesTranslationUpdateOne {
	if s != nil {
		bstuo.SetLanguageCode(*s)
	}
	return bstuo
}

// SetTitle sets the "title" field.
func (bstuo *BlogSeriesTranslationUpdateOne) SetTitle(s string) *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.SetTitle(s)
	return bstuo
}

// SetNillableTitle sets the "title" field if the given value is not nil.
func (bstuo *BlogSeriesTranslationUpdateOne) SetNillableTitle(s *string) *BlogSeriesTranslationUpdateOne {
	if s != nil {
		bstuo.SetTitle(*s)
	}
	return bstuo
}

// SetDescription sets the "description" field.
func (bstuo *BlogSeriesTranslationUpdateOne) SetDescription(s string) *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.SetDescription(s)
	return bstuo
}

// SetNillableDescription sets the "description" field if the given value is not nil.
func (bstuo *BlogSeriesTranslationUpdateOne) SetNillableDescription(s *string) *BlogSeriesTranslationUpdateOne {
	if s != nil {
		bstuo.SetDescription(*s)
	}
	return bstuo
}

// ClearDescription clears the value of the "description" field.
func (bstuo *BlogSeriesTranslationUpdateOne) ClearDescription() *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.ClearDescription()
	return bstuo
}

// SetBlogSeries sets the "blog_series" edge to the BlogSeries entity.
func (bstuo *BlogSeriesTranslationUpdateOne) SetBlogSeries(b *BlogSeries) *BlogSeriesTranslationUpdateOne {
	return bstuo.SetBlogSeriesID(b.ID)
}

// SetLanguageID sets the "language" edge to the Language entity by ID.
func (bstuo *BlogSeriesTranslationUpdateOne) SetLanguageID(id string) *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.SetLanguageID(id)
	return bstuo
}

// SetLanguage sets the "language" edge to the Language entity.
func (bstuo *BlogSeriesTranslationUpdateOne) SetLanguage(l *Language) *BlogSeriesTranslationUpdateOne {
	return bstuo.SetLanguageID(l.ID)
}

// Mutation returns the BlogSeriesTranslationMutation object of the builder.
func (bstuo *BlogSeriesTranslationUpdateOne) Mutation() *BlogSeriesTranslationMutation {
	return bstuo.mutation
}

// ClearBlogSeries clears the "blog_series" edge to the BlogSeries entity.
func (bstuo *BlogSeriesTranslationUpdateOne) ClearBlogSeries() *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.ClearBlogSeries()
	return bstuo
}

// ClearLanguage clears the "language" edge to the Language entity.
func (bstuo *BlogSeriesTranslationUpdateOne) ClearLanguage() *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.ClearLanguage()
	return bstuo
}

// Where appends a list predicates to the BlogSeriesTranslationUpdate builder.
func (bstuo *BlogSeriesTranslationUpdateOne) Where(ps ...predicate.BlogSeriesTranslation) *BlogSeriesTranslationUpdateOne {
	bstuo.mutation.Where(ps...)
	return bstuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (bstuo *BlogSeriesTranslationUpdateOne) Select(field string, fields ...string) *BlogSeriesTranslationUpdateOne {
	bstuo.fields = append([]string{field}, fields...)
	return bstuo
}

// Save executes the query and returns the updated BlogSeriesTranslation entity.
func (bstuo *BlogSeriesTranslationUpdateOne) Save(ctx context.Context) (*BlogSeriesTranslation, error) {
	return withHooks(ctx, bstuo.sqlSave, bstuo.mutation, bstuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (bstuo *BlogSeriesTranslationUpdateOne) SaveX(ctx context.Context) *BlogSeriesTranslation {
	node, err := bstuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (bstuo *BlogSeriesTranslationUpdateOne) Exec(ctx context.Context) error {
	_, err := bstuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (bstuo *BlogSeriesTranslationUpdateOne) ExecX(ctx context.Context) {
	if err := bstuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (bstuo *BlogSeriesTranslationUpdateOne) check() error {
	if v, ok := bstuo.mutation.LanguageCode(); ok {
		if err := blogseriestranslation.LanguageCodeValidator(v); err != nil {
			return &ValidationError{Name: "language_code", err: fmt.Errorf(`ent: validator failed for field "BlogSeriesTranslation.language_code": %w`, err)}
		}
	}
	if v, ok := bstuo.mutation.Title(); ok {
		if err := blogseriestranslation.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "BlogSeriesTranslation.title": %w`, err)}
		}
	}
	if bstuo.mutation.BlogSeriesCleared() && len(bstuo.mutation.BlogSeriesIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogSeriesTranslation.blog_series"`)
	}
	if bstuo.mutation.LanguageCleared() && len(bstuo.mutation.LanguageIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogSeriesTranslation.language"`)
	}
	return nil
}

func (bstuo *BlogSeriesTranslationUpdateOne) sqlSave(ctx context.Context) (_node *BlogSeriesTranslation, err error) {
	if err := bstuo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(blogseriestranslation.Table, blogseriestranslation.Columns, sqlgraph.NewFieldSpec(blogseriestranslation.FieldID, field.TypeUUID))
	id, ok := bstuo.mutation.ID()
	if !ok {
		return nil, &ValidationError{Name: "id", err: errors.New(`ent: missing "BlogSeriesTranslation.id" for update`)}
	}
	_spec.Node.ID.Value = id
	if fields := bstuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, blogseriestranslation.FieldID)
		for _, f := range fields {
			if !blogseriestranslation.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			if f != blogseriestranslation.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, f)
			}
		}
	}
	if ps := bstuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if value, ok := bstuo.mutation.Title(); ok {
		_spec.SetField(blogseriestranslation.FieldTitle, field.TypeString, value)
	}
	if value, ok := bstuo.mutation.Description(); ok {
		_spec.SetField(blogseriestranslation.FieldDescription, field.TypeString, value)
	}
	if bstuo.mutation.DescriptionCleared() {
		_spec.ClearField(blogseriestranslation.FieldDescription, field.TypeString)
	}
	if bstuo.mutation.BlogSeriesCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.BlogSeriesTable,
			Columns: []string{blogseriestranslation.BlogSeriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogseries.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bstuo.mutation.BlogSeriesIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.BlogSeriesTable,
			Columns: []string{blogseriestranslation.BlogSeriesColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogseries.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if bstuo.mutation.LanguageCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.LanguageTable,
			Columns: []string{blogseriestranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bstuo.mutation.LanguageIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   blogseriestranslation.LanguageTable,
			Columns: []string{blogseriestranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &BlogSeriesTranslation{config: bstuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, bstuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{blogseriestranslation.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	bstuo.mutation.done = true
	return _node, nil
}

// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/blogpost"
	"silan-backend/internal/ent/blogposttag"
	"silan-backend/internal/ent/blogtag"
	"silan-backend/internal/ent/predicate"

	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogPostTagUpdate is the builder for updating BlogPostTag entities.
type BlogPostTagUpdate struct {
	config
	hooks    []Hook
	mutation *BlogPostTagMutation
}

// Where appends a list predicates to the BlogPostTagUpdate builder.
func (bptu *BlogPostTagUpdate) Where(ps ...predicate.BlogPostTag) *BlogPostTagUpdate {
	bptu.mutation.Where(ps...)
	return bptu
}

// SetBlogPostID sets the "blog_post_id" field.
func (bptu *BlogPostTagUpdate) SetBlogPostID(u uuid.UUID) *BlogPostTagUpdate {
	bptu.mutation.SetBlogPostID(u)
	return bptu
}

// SetNillableBlogPostID sets the "blog_post_id" field if the given value is not nil.
func (bptu *BlogPostTagUpdate) SetNillableBlogPostID(u *uuid.UUID) *BlogPostTagUpdate {
	if u != nil {
		bptu.SetBlogPostID(*u)
	}
	return bptu
}

// SetBlogTagID sets the "blog_tag_id" field.
func (bptu *BlogPostTagUpdate) SetBlogTagID(u uuid.UUID) *BlogPostTagUpdate {
	bptu.mutation.SetBlogTagID(u)
	return bptu
}

// SetNillableBlogTagID sets the "blog_tag_id" field if the given value is not nil.
func (bptu *BlogPostTagUpdate) SetNillableBlogTagID(u *uuid.UUID) *BlogPostTagUpdate {
	if u != nil {
		bptu.SetBlogTagID(*u)
	}
	return bptu
}

// SetBlogPost sets the "blog_post" edge to the BlogPost entity.
func (bptu *BlogPostTagUpdate) SetBlogPost(b *BlogPost) *BlogPostTagUpdate {
	return bptu.SetBlogPostID(b.ID)
}

// SetBlogTag sets the "blog_tag" edge to the BlogTag entity.
func (bptu *BlogPostTagUpdate) SetBlogTag(b *BlogTag) *BlogPostTagUpdate {
	return bptu.SetBlogTagID(b.ID)
}

// Mutation returns the BlogPostTagMutation object of the builder.
func (bptu *BlogPostTagUpdate) Mutation() *BlogPostTagMutation {
	return bptu.mutation
}

// ClearBlogPost clears the "blog_post" edge to the BlogPost entity.
func (bptu *BlogPostTagUpdate) ClearBlogPost() *BlogPostTagUpdate {
	bptu.mutation.ClearBlogPost()
	return bptu
}

// ClearBlogTag clears the "blog_tag" edge to the BlogTag entity.
func (bptu *BlogPostTagUpdate) ClearBlogTag() *BlogPostTagUpdate {
	bptu.mutation.ClearBlogTag()
	return bptu
}

// Save executes the query and returns the number of nodes affected by the update operation.
func (bptu *BlogPostTagUpdate) Save(ctx context.Context) (int, error) {
	return withHooks(ctx, bptu.sqlSave, bptu.mutation, bptu.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (bptu *BlogPostTagUpdate) SaveX(ctx context.Context) int {
	affected, err := bptu.Save(ctx)
	if err != nil {
		panic(err)
	}
	return affected
}

// Exec executes the query.
func (bptu *BlogPostTagUpdate) Exec(ctx context.Context) error {
	_, err := bptu.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (bptu *BlogPostTagUpdate) ExecX(ctx context.Context) {
	if err := bptu.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (bptu *BlogPostTagUpdate) check() error {
	if bptu.mutation.BlogPostCleared() && len(bptu.mutation.BlogPostIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogPostTag.blog_post"`)
	}
	if bptu.mutation.BlogTagCleared() && len(bptu.mutation.BlogTagIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogPostTag.blog_tag"`)
	}
	return nil
}

func (bptu *BlogPostTagUpdate) sqlSave(ctx context.Context) (n int, err error) {
	if err := bptu.check(); err != nil {
		return n, err
	}
	_spec := sqlgraph.NewUpdateSpec(blogposttag.Table, blogposttag.Columns, sqlgraph.NewFieldSpec(blogposttag.FieldBlogPostID, field.TypeUUID), sqlgraph.NewFieldSpec(blogposttag.FieldBlogTagID, field.TypeUUID))
	if ps := bptu.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if bptu.mutation.BlogPostCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogPostTable,
			Columns: []string{blogposttag.BlogPostColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogpost.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bptu.mutation.BlogPostIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogPostTable,
			Columns: []string{blogposttag.BlogPostColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogpost.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if bptu.mutation.BlogTagCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogTagTable,
			Columns: []string{blogposttag.BlogTagColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogtag.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bptu.mutation.BlogTagIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogTagTable,
			Columns: []string{blogposttag.BlogTagColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogtag.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if n, err = sqlgraph.UpdateNodes(ctx, bptu.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{blogposttag.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return 0, err
	}
	bptu.mutation.done = true
	return n, nil
}

// BlogPostTagUpdateOne is the builder for updating a single BlogPostTag entity.
type BlogPostTagUpdateOne struct {
	config
	fields   []string
	hooks    []Hook
	mutation *BlogPostTagMutation
}

// SetBlogPostID sets the "blog_post_id" field.
func (bptuo *BlogPostTagUpdateOne) SetBlogPostID(u uuid.UUID) *BlogPostTagUpdateOne {
	bptuo.mutation.SetBlogPostID(u)
	return bptuo
}

// SetNillableBlogPostID sets the "blog_post_id" field if the given value is not nil.
func (bptuo *BlogPostTagUpdateOne) SetNillableBlogPostID(u *uuid.UUID) *BlogPostTagUpdateOne {
	if u != nil {
		bptuo.SetBlogPostID(*u)
	}
	return bptuo
}

// SetBlogTagID sets the "blog_tag_id" field.
func (bptuo *BlogPostTagUpdateOne) SetBlogTagID(u uuid.UUID) *BlogPostTagUpdateOne {
	bptuo.mutation.SetBlogTagID(u)
	return bptuo
}

// SetNillableBlogTagID sets the "blog_tag_id" field if the given value is not nil.
func (bptuo *BlogPostTagUpdateOne) SetNillableBlogTagID(u *uuid.UUID) *BlogPostTagUpdateOne {
	if u != nil {
		bptuo.SetBlogTagID(*u)
	}
	return bptuo
}

// SetBlogPost sets the "blog_post" edge to the BlogPost entity.
func (bptuo *BlogPostTagUpdateOne) SetBlogPost(b *BlogPost) *BlogPostTagUpdateOne {
	return bptuo.SetBlogPostID(b.ID)
}

// SetBlogTag sets the "blog_tag" edge to the BlogTag entity.
func (bptuo *BlogPostTagUpdateOne) SetBlogTag(b *BlogTag) *BlogPostTagUpdateOne {
	return bptuo.SetBlogTagID(b.ID)
}

// Mutation returns the BlogPostTagMutation object of the builder.
func (bptuo *BlogPostTagUpdateOne) Mutation() *BlogPostTagMutation {
	return bptuo.mutation
}

// ClearBlogPost clears the "blog_post" edge to the BlogPost entity.
func (bptuo *BlogPostTagUpdateOne) ClearBlogPost() *BlogPostTagUpdateOne {
	bptuo.mutation.ClearBlogPost()
	return bptuo
}

// ClearBlogTag clears the "blog_tag" edge to the BlogTag entity.
func (bptuo *BlogPostTagUpdateOne) ClearBlogTag() *BlogPostTagUpdateOne {
	bptuo.mutation.ClearBlogTag()
	return bptuo
}

// Where appends a list predicates to the BlogPostTagUpdate builder.
func (bptuo *BlogPostTagUpdateOne) Where(ps ...predicate.BlogPostTag) *BlogPostTagUpdateOne {
	bptuo.mutation.Where(ps...)
	return bptuo
}

// Select allows selecting one or more fields (columns) of the returned entity.
// The default is selecting all fields defined in the entity schema.
func (bptuo *BlogPostTagUpdateOne) Select(field string, fields ...string) *BlogPostTagUpdateOne {
	bptuo.fields = append([]string{field}, fields...)
	return bptuo
}

// Save executes the query and returns the updated BlogPostTag entity.
func (bptuo *BlogPostTagUpdateOne) Save(ctx context.Context) (*BlogPostTag, error) {
	return withHooks(ctx, bptuo.sqlSave, bptuo.mutation, bptuo.hooks)
}

// SaveX is like Save, but panics if an error occurs.
func (bptuo *BlogPostTagUpdateOne) SaveX(ctx context.Context) *BlogPostTag {
	node, err := bptuo.Save(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// Exec executes the query on the entity.
func (bptuo *BlogPostTagUpdateOne) Exec(ctx context.Context) error {
	_, err := bptuo.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (bptuo *BlogPostTagUpdateOne) ExecX(ctx context.Context) {
	if err := bptuo.Exec(ctx); err != nil {
		panic(err)
	}
}

// check runs all checks and user-defined validators on the builder.
func (bptuo *BlogPostTagUpdateOne) check() error {
	if bptuo.mutation.BlogPostCleared() && len(bptuo.mutation.BlogPostIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogPostTag.blog_post"`)
	}
	if bptuo.mutation.BlogTagCleared() && len(bptuo.mutation.BlogTagIDs()) > 0 {
		return errors.New(`ent: clearing a required unique edge "BlogPostTag.blog_tag"`)
	}
	return nil
}

func (bptuo *BlogPostTagUpdateOne) sqlSave(ctx context.Context) (_node *BlogPostTag, err error) {
	if err := bptuo.check(); err != nil {
		return _node, err
	}
	_spec := sqlgraph.NewUpdateSpec(blogposttag.Table, blogposttag.Columns, sqlgraph.NewFieldSpec(blogposttag.FieldBlogPostID, field.TypeUUID), sqlgraph.NewFieldSpec(blogposttag.FieldBlogTagID, field.TypeUUID))
	if id, ok := bptuo.mutation.BlogPostID(); !ok {
		return nil, &ValidationError{Name: "blog_post_id", err: errors.New(`ent: missing "BlogPostTag.blog_post_id" for update`)}
	} else {
		_spec.Node.CompositeID[0].Value = id
	}
	if id, ok := bptuo.mutation.BlogTagID(); !ok {
		return nil, &ValidationError{Name: "blog_tag_id", err: errors.New(`ent: missing "BlogPostTag.blog_tag_id" for update`)}
	} else {
		_spec.Node.CompositeID[1].Value = id
	}
	if fields := bptuo.fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, len(fields))
		for i, f := range fields {
			if !blogposttag.ValidColumn(f) {
				return nil, &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
			}
			_spec.Node.Columns[i] = f
		}
	}
	if ps := bptuo.mutation.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if bptuo.mutation.BlogPostCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogPostTable,
			Columns: []string{blogposttag.BlogPostColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogpost.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bptuo.mutation.BlogPostIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogPostTable,
			Columns: []string{blogposttag.BlogPostColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogpost.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	if bptuo.mutation.BlogTagCleared() {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogTagTable,
			Columns: []string{blogposttag.BlogTagColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogtag.FieldID, field.TypeUUID),
			},
		}
		_spec.Edges.Clear = append(_spec.Edges.Clear, edge)
	}
	if nodes := bptuo.mutation.BlogTagIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: false,
			Table:   blogposttag.BlogTagTable,
			Columns: []string{blogposttag.BlogTagColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(blogtag.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges.Add = append(_spec.Edges.Add, edge)
	}
	_node = &BlogPostTag{config: bptuo.config}
	_spec.Assign = _node.assignValues
	_spec.ScanValues = _node.scanValues
	if err = sqlgraph.UpdateNode(ctx, bptuo.driver, _spec); err != nil {
		if _, ok := err.(*sqlgraph.NotFoundError); ok {
			err = &NotFoundError{blogposttag.Label}
		} else if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	bptuo.mutation.done = true
	return _node, nil
}

// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/recentupdate"
	"silan-backend/internal/ent/recentupdatetranslation"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// RecentUpdateTranslationCreate is the builder for creating a RecentUpdateTranslation entity.
type RecentUpdateTranslationCreate struct {
	config
	mutation *RecentUpdateTranslationMutation
	hooks    []Hook
}

// SetRecentUpdateID sets the "recent_update_id" field.
func (rutc *RecentUpdateTranslationCreate) SetRecentUpdateID(u uuid.UUID) *RecentUpdateTranslationCreate {
	rutc.mutation.SetRecentUpdateID(u)
	return rutc
}

// SetLanguageCode sets the "language_code" field.
func (rutc *RecentUpdateTranslationCreate) SetLanguageCode(s string) *RecentUpdateTranslationCreate {
	rutc.mutation.SetLanguageCode(s)
	return rutc
}

// SetTitle sets the "title" field.
func (rutc *RecentUpdateTranslationCreate) SetTitle(s string) *RecentUpdateTranslationCreate {
	rutc.mutation.SetTitle(s)
	return rutc
}

// SetDescription sets the "description" field.
func (rutc *RecentUpdateTranslationCreate) SetDescription(s string) *RecentUpdateTranslationCreate {
	rutc.mutation.SetDescription(s)
	return rutc
}

// SetCreatedAt sets the "created_at" field.
func (rutc *RecentUpdateTranslationCreate) SetCreatedAt(t time.Time) *RecentUpdateTranslationCreate {
	rutc.mutation.SetCreatedAt(t)
	return rutc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (rutc *RecentUpdateTranslationCreate) SetNillableCreatedAt(t *time.Time) *RecentUpdateTranslationCreate {
	if t != nil {
		rutc.SetCreatedAt(*t)
	}
	return rutc
}

// SetID sets the "id" field.
func (rutc *RecentUpdateTranslationCreate) SetID(u uuid.UUID) *RecentUpdateTranslationCreate {
	rutc.mutation.SetID(u)
	return rutc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (rutc *RecentUpdateTranslationCreate) SetNillableID(u *uuid.UUID) *RecentUpdateTranslationCreate {
	if u != nil {
		rutc.SetID(*u)
	}
	return rutc
}

// SetRecentUpdate sets the "recent_update" edge to the RecentUpdate entity.
func (rutc *RecentUpdateTranslationCreate) SetRecentUpdate(r *RecentUpdate) *RecentUpdateTranslationCreate {
	return rutc.SetRecentUpdateID(r.ID)
}

// SetLanguageID sets the "language" edge to the Language entity by ID.
func (rutc *RecentUpdateTranslationCreate) SetLanguageID(id string) *RecentUpdateTranslationCreate {
	rutc.mutation.SetLanguageID(id)
	return rutc
}

// SetLanguage sets the "language" edge to the Language entity.
func (rutc *RecentUpdateTranslationCreate) SetLanguage(l *Language) *RecentUpdateTranslationCreate {
	return rutc.SetLanguageID(l.ID)
}

// Mutation returns the RecentUpdateTranslationMutation object of the builder.
func (rutc *RecentUpdateTranslationCreate) Mutation() *RecentUpdateTranslationMutation {
	return rutc.mutation
}

// Save creates the RecentUpdateTranslation in the database.
func (rutc *RecentUpdateTranslationCreate) Save(ctx context.Context) (*RecentUpdateTranslation, error) {
	rutc.defaults()
	return withHooks(ctx, rutc.sqlSave, rutc.mutation, rutc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (rutc *RecentUpdateTranslationCreate) SaveX(ctx context.Context) *RecentUpdateTranslation {
	v, err := rutc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (rutc *RecentUpdateTranslationCreate) Exec(ctx context.Context) error {
	_, err := rutc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rutc *RecentUpdateTranslationCreate) ExecX(ctx context.Context) {
	if err := rutc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rutc *RecentUpdateTranslationCreate) defaults() {
	if _, ok := rutc.mutation.CreatedAt(); !ok {
		v := recentupdatetranslation.DefaultCreatedAt()
		rutc.mutation.SetCreatedAt(v)
	}
	if _, ok := rutc.mutation.ID(); !ok {
		v := recentupdatetranslation.DefaultID()
		rutc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rutc *RecentUpdateTranslationCreate) check() error {
	if _, ok := rutc.mutation.RecentUpdateID(); !ok {
		return &ValidationError{Name: "recent_update_id", err: errors.New(`ent: missing required field "RecentUpdateTranslation.recent_update_id"`)}
	}
	if _, ok := rutc.mutation.LanguageCode(); !ok {
		return &ValidationError{Name: "language_code", err: errors.New(`ent: missing required field "RecentUpdateTranslation.language_code"`)}
	}
	if v, ok := rutc.mutation.LanguageCode(); ok {
		if err := recentupdatetranslation.LanguageCodeValidator(v); err != nil {
			return &ValidationError{Name: "language_code", err: fmt.Errorf(`ent: validator failed for field "RecentUpdateTranslation.language_code": %w`, err)}
		}
	}
	if _, ok := rutc.mutation.Title(); !ok {
		return &ValidationError{Name: "title", err: errors.New(`ent: missing required field "RecentUpdateTranslation.title"`)}
	}
	if v, ok := rutc.mutation.Title(); ok {
		if err := recentupdatetranslation.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "RecentUpdateTranslation.title": %w`, err)}
		}
	}
	if _, ok := rutc.mutation.Description(); !ok {
		return &ValidationError{Name: "description", err: errors.New(`ent: missing required field "RecentUpdateTranslation.description"`)}
	}
	if v, ok := rutc.mutation.Description(); ok {
		if err := recentupdatetranslation.DescriptionValidator(v); err != nil {
			return &ValidationError{Name: "description", err: fmt.Errorf(`ent: validator failed for field "RecentUpdateTranslation.description": %w`, err)}
		}
	}
	if _, ok := rutc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "RecentUpdateTranslation.created_at"`)}
	}
	if len(rutc.mutation.RecentUpdateIDs()) == 0 {
		return &ValidationError{Name: "recent_update", err: errors.New(`ent: missing required edge "RecentUpdateTranslation.recent_update"`)}
	}
	if len(rutc.mutation.LanguageIDs()) == 0 {
		return &ValidationError{Name: "language", err: errors.New(`ent: missing required edge "RecentUpdateTranslation.language"`)}
	}
	return nil
}

func (rutc *RecentUpdateTranslationCreate) sqlSave(ctx context.Context) (*RecentUpdateTranslation, error) {
	if err := rutc.check(); err != nil {
		return nil, err
	}
	_node, _spec := rutc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rutc.driver, _spec); err != nil {
		if sqlgraph.IsConstraintError(err) {
			err = &ConstraintError{msg: err.Error(), wrap: err}
		}
		return nil, err
	}
	if _spec.ID.Value != nil {
		if id, ok := _spec.ID.Value.(*uuid.UUID); ok {
			_node.ID = *id
		} else if err := _node.ID.Scan(_spec.ID.Value); err != nil {
			return nil, err
		}
	}
	rutc.mutation.id = &_node.ID
	rutc.mutation.done = true
	return _node, nil
}

func (rutc *RecentUpdateTranslationCreate) createSpec() (*RecentUpdateTranslation, *sqlgraph.CreateSpec) {
	var (
		_node = &RecentUpdateTranslation{config: rutc.config}
		_spec = sqlgraph.NewCreateSpec(recentupdatetranslation.Table, sqlgraph.NewFieldSpec(recentupdatetranslation.FieldID, field.TypeUUID))
	)
	if id, ok := rutc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := rutc.mutation.Title(); ok {
		_spec.SetField(recentupdatetranslation.FieldTitle, field.TypeString, value)
		_node.Title = value
	}
	if value, ok := rutc.mutation.Description(); ok {
		_spec.SetField(recentupdatetranslation.FieldDescription, field.TypeString, value)
		_node.Description = value
	}
	if value, ok := rutc.mutation.CreatedAt(); ok {
		_spec.SetField(recentupdatetranslation.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if nodes := rutc.mutation.RecentUpdateIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   recentupdatetranslation.RecentUpdateTable,
			Columns: []string{recentupdatetranslation.RecentUpdateColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(recentupdate.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.RecentUpdateID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rutc.mutation.LanguageIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   recentupdatetranslation.LanguageTable,
			Columns: []string{recentupdatetranslation.LanguageColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(language.FieldID, field.TypeString),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.LanguageCode = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// RecentUpdateTranslationCreateBulk is the builder for creating many RecentUpdateTranslation entities in bulk.
type RecentUpdateTranslationCreateBulk struct {
	config
	err      error
	builders []*RecentUpdateTranslationCreate
}

// Save creates the RecentUpdateTranslation entities in the database.
func (rutcb *RecentUpdateTranslationCreateBulk) Save(ctx context.Context) ([]*RecentUpdateTranslation, error) {
	if rutcb.err != nil {
		return nil, rutcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(rutcb.builders))
	nodes := make([]*RecentUpdateTranslation, len(rutcb.builders))
	mutators := make([]Mutator, len(rutcb.builders))
	for i := range rutcb.builders {
		func(i int, root context.Context) {
			builder := rutcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*RecentUpdateTranslationMutation)
				if !ok {
					return nil, fmt.Errorf("unexpected mutation type %T", m)
				}
				if err := builder.check(); err != nil {
					return nil, err
				}
				builder.mutation = mutation
				var err error
				nodes[i], specs[i] = builder.createSpec()
				if i < len(mutators)-1 {
					_, err = mutators[i+1].Mutate(root, rutcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rutcb.driver, spec); err != nil {
						if sqlgraph.IsConstraintError(err) {
							err = &ConstraintError{msg: err.Error(), wrap: err}
						}
					}
				}
				if err != nil {
					return nil, err
				}
				mutation.id = &nodes[i].ID
				mutation.done = true
				return nodes[i], nil
			})
			for i := len(builder.hooks) - 1; i >= 0; i-- {
				mut = builder.hooks[i](mut)
			}
			mutators[i] = mut
		}(i, ctx)
	}
	if len(mutators) > 0 {
		if _, err := mutators[0].Mutate(ctx, rutcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (rutcb *RecentUpdateTranslationCreateBulk) SaveX(ctx context.Context) []*RecentUpdateTranslation {
	v, err := rutcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (rutcb *RecentUpdateTranslationCreateBulk) Exec(ctx context.Context) error {
	_, err := rutcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rutcb *RecentUpdateTranslationCreateBulk) ExecX(ctx context.Context) {
	if err := rutcb.Exec(ctx); err != nil {
		panic(err)
	}
}

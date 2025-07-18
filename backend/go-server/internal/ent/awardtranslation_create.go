// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/award"
	"silan-backend/internal/ent/awardtranslation"
	"silan-backend/internal/ent/language"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// AwardTranslationCreate is the builder for creating a AwardTranslation entity.
type AwardTranslationCreate struct {
	config
	mutation *AwardTranslationMutation
	hooks    []Hook
}

// SetAwardID sets the "award_id" field.
func (atc *AwardTranslationCreate) SetAwardID(u uuid.UUID) *AwardTranslationCreate {
	atc.mutation.SetAwardID(u)
	return atc
}

// SetLanguageCode sets the "language_code" field.
func (atc *AwardTranslationCreate) SetLanguageCode(s string) *AwardTranslationCreate {
	atc.mutation.SetLanguageCode(s)
	return atc
}

// SetTitle sets the "title" field.
func (atc *AwardTranslationCreate) SetTitle(s string) *AwardTranslationCreate {
	atc.mutation.SetTitle(s)
	return atc
}

// SetAwardingOrganization sets the "awarding_organization" field.
func (atc *AwardTranslationCreate) SetAwardingOrganization(s string) *AwardTranslationCreate {
	atc.mutation.SetAwardingOrganization(s)
	return atc
}

// SetAwardType sets the "award_type" field.
func (atc *AwardTranslationCreate) SetAwardType(s string) *AwardTranslationCreate {
	atc.mutation.SetAwardType(s)
	return atc
}

// SetNillableAwardType sets the "award_type" field if the given value is not nil.
func (atc *AwardTranslationCreate) SetNillableAwardType(s *string) *AwardTranslationCreate {
	if s != nil {
		atc.SetAwardType(*s)
	}
	return atc
}

// SetDescription sets the "description" field.
func (atc *AwardTranslationCreate) SetDescription(s string) *AwardTranslationCreate {
	atc.mutation.SetDescription(s)
	return atc
}

// SetNillableDescription sets the "description" field if the given value is not nil.
func (atc *AwardTranslationCreate) SetNillableDescription(s *string) *AwardTranslationCreate {
	if s != nil {
		atc.SetDescription(*s)
	}
	return atc
}

// SetCreatedAt sets the "created_at" field.
func (atc *AwardTranslationCreate) SetCreatedAt(t time.Time) *AwardTranslationCreate {
	atc.mutation.SetCreatedAt(t)
	return atc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (atc *AwardTranslationCreate) SetNillableCreatedAt(t *time.Time) *AwardTranslationCreate {
	if t != nil {
		atc.SetCreatedAt(*t)
	}
	return atc
}

// SetID sets the "id" field.
func (atc *AwardTranslationCreate) SetID(u uuid.UUID) *AwardTranslationCreate {
	atc.mutation.SetID(u)
	return atc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (atc *AwardTranslationCreate) SetNillableID(u *uuid.UUID) *AwardTranslationCreate {
	if u != nil {
		atc.SetID(*u)
	}
	return atc
}

// SetAward sets the "award" edge to the Award entity.
func (atc *AwardTranslationCreate) SetAward(a *Award) *AwardTranslationCreate {
	return atc.SetAwardID(a.ID)
}

// SetLanguageID sets the "language" edge to the Language entity by ID.
func (atc *AwardTranslationCreate) SetLanguageID(id string) *AwardTranslationCreate {
	atc.mutation.SetLanguageID(id)
	return atc
}

// SetLanguage sets the "language" edge to the Language entity.
func (atc *AwardTranslationCreate) SetLanguage(l *Language) *AwardTranslationCreate {
	return atc.SetLanguageID(l.ID)
}

// Mutation returns the AwardTranslationMutation object of the builder.
func (atc *AwardTranslationCreate) Mutation() *AwardTranslationMutation {
	return atc.mutation
}

// Save creates the AwardTranslation in the database.
func (atc *AwardTranslationCreate) Save(ctx context.Context) (*AwardTranslation, error) {
	atc.defaults()
	return withHooks(ctx, atc.sqlSave, atc.mutation, atc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (atc *AwardTranslationCreate) SaveX(ctx context.Context) *AwardTranslation {
	v, err := atc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (atc *AwardTranslationCreate) Exec(ctx context.Context) error {
	_, err := atc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (atc *AwardTranslationCreate) ExecX(ctx context.Context) {
	if err := atc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (atc *AwardTranslationCreate) defaults() {
	if _, ok := atc.mutation.CreatedAt(); !ok {
		v := awardtranslation.DefaultCreatedAt()
		atc.mutation.SetCreatedAt(v)
	}
	if _, ok := atc.mutation.ID(); !ok {
		v := awardtranslation.DefaultID()
		atc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (atc *AwardTranslationCreate) check() error {
	if _, ok := atc.mutation.AwardID(); !ok {
		return &ValidationError{Name: "award_id", err: errors.New(`ent: missing required field "AwardTranslation.award_id"`)}
	}
	if _, ok := atc.mutation.LanguageCode(); !ok {
		return &ValidationError{Name: "language_code", err: errors.New(`ent: missing required field "AwardTranslation.language_code"`)}
	}
	if v, ok := atc.mutation.LanguageCode(); ok {
		if err := awardtranslation.LanguageCodeValidator(v); err != nil {
			return &ValidationError{Name: "language_code", err: fmt.Errorf(`ent: validator failed for field "AwardTranslation.language_code": %w`, err)}
		}
	}
	if _, ok := atc.mutation.Title(); !ok {
		return &ValidationError{Name: "title", err: errors.New(`ent: missing required field "AwardTranslation.title"`)}
	}
	if v, ok := atc.mutation.Title(); ok {
		if err := awardtranslation.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "AwardTranslation.title": %w`, err)}
		}
	}
	if _, ok := atc.mutation.AwardingOrganization(); !ok {
		return &ValidationError{Name: "awarding_organization", err: errors.New(`ent: missing required field "AwardTranslation.awarding_organization"`)}
	}
	if v, ok := atc.mutation.AwardingOrganization(); ok {
		if err := awardtranslation.AwardingOrganizationValidator(v); err != nil {
			return &ValidationError{Name: "awarding_organization", err: fmt.Errorf(`ent: validator failed for field "AwardTranslation.awarding_organization": %w`, err)}
		}
	}
	if v, ok := atc.mutation.AwardType(); ok {
		if err := awardtranslation.AwardTypeValidator(v); err != nil {
			return &ValidationError{Name: "award_type", err: fmt.Errorf(`ent: validator failed for field "AwardTranslation.award_type": %w`, err)}
		}
	}
	if _, ok := atc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "AwardTranslation.created_at"`)}
	}
	if len(atc.mutation.AwardIDs()) == 0 {
		return &ValidationError{Name: "award", err: errors.New(`ent: missing required edge "AwardTranslation.award"`)}
	}
	if len(atc.mutation.LanguageIDs()) == 0 {
		return &ValidationError{Name: "language", err: errors.New(`ent: missing required edge "AwardTranslation.language"`)}
	}
	return nil
}

func (atc *AwardTranslationCreate) sqlSave(ctx context.Context) (*AwardTranslation, error) {
	if err := atc.check(); err != nil {
		return nil, err
	}
	_node, _spec := atc.createSpec()
	if err := sqlgraph.CreateNode(ctx, atc.driver, _spec); err != nil {
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
	atc.mutation.id = &_node.ID
	atc.mutation.done = true
	return _node, nil
}

func (atc *AwardTranslationCreate) createSpec() (*AwardTranslation, *sqlgraph.CreateSpec) {
	var (
		_node = &AwardTranslation{config: atc.config}
		_spec = sqlgraph.NewCreateSpec(awardtranslation.Table, sqlgraph.NewFieldSpec(awardtranslation.FieldID, field.TypeUUID))
	)
	if id, ok := atc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := atc.mutation.Title(); ok {
		_spec.SetField(awardtranslation.FieldTitle, field.TypeString, value)
		_node.Title = value
	}
	if value, ok := atc.mutation.AwardingOrganization(); ok {
		_spec.SetField(awardtranslation.FieldAwardingOrganization, field.TypeString, value)
		_node.AwardingOrganization = value
	}
	if value, ok := atc.mutation.AwardType(); ok {
		_spec.SetField(awardtranslation.FieldAwardType, field.TypeString, value)
		_node.AwardType = value
	}
	if value, ok := atc.mutation.Description(); ok {
		_spec.SetField(awardtranslation.FieldDescription, field.TypeString, value)
		_node.Description = value
	}
	if value, ok := atc.mutation.CreatedAt(); ok {
		_spec.SetField(awardtranslation.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if nodes := atc.mutation.AwardIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   awardtranslation.AwardTable,
			Columns: []string{awardtranslation.AwardColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(award.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.AwardID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := atc.mutation.LanguageIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   awardtranslation.LanguageTable,
			Columns: []string{awardtranslation.LanguageColumn},
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

// AwardTranslationCreateBulk is the builder for creating many AwardTranslation entities in bulk.
type AwardTranslationCreateBulk struct {
	config
	err      error
	builders []*AwardTranslationCreate
}

// Save creates the AwardTranslation entities in the database.
func (atcb *AwardTranslationCreateBulk) Save(ctx context.Context) ([]*AwardTranslation, error) {
	if atcb.err != nil {
		return nil, atcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(atcb.builders))
	nodes := make([]*AwardTranslation, len(atcb.builders))
	mutators := make([]Mutator, len(atcb.builders))
	for i := range atcb.builders {
		func(i int, root context.Context) {
			builder := atcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*AwardTranslationMutation)
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
					_, err = mutators[i+1].Mutate(root, atcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, atcb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, atcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (atcb *AwardTranslationCreateBulk) SaveX(ctx context.Context) []*AwardTranslation {
	v, err := atcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (atcb *AwardTranslationCreateBulk) Exec(ctx context.Context) error {
	_, err := atcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (atcb *AwardTranslationCreateBulk) ExecX(ctx context.Context) {
	if err := atcb.Exec(ctx); err != nil {
		panic(err)
	}
}

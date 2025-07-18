// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/education"
	"silan-backend/internal/ent/educationdetail"
	"silan-backend/internal/ent/educationdetailtranslation"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// EducationDetailCreate is the builder for creating a EducationDetail entity.
type EducationDetailCreate struct {
	config
	mutation *EducationDetailMutation
	hooks    []Hook
}

// SetEducationID sets the "education_id" field.
func (edc *EducationDetailCreate) SetEducationID(u uuid.UUID) *EducationDetailCreate {
	edc.mutation.SetEducationID(u)
	return edc
}

// SetDetailText sets the "detail_text" field.
func (edc *EducationDetailCreate) SetDetailText(s string) *EducationDetailCreate {
	edc.mutation.SetDetailText(s)
	return edc
}

// SetSortOrder sets the "sort_order" field.
func (edc *EducationDetailCreate) SetSortOrder(i int) *EducationDetailCreate {
	edc.mutation.SetSortOrder(i)
	return edc
}

// SetNillableSortOrder sets the "sort_order" field if the given value is not nil.
func (edc *EducationDetailCreate) SetNillableSortOrder(i *int) *EducationDetailCreate {
	if i != nil {
		edc.SetSortOrder(*i)
	}
	return edc
}

// SetCreatedAt sets the "created_at" field.
func (edc *EducationDetailCreate) SetCreatedAt(t time.Time) *EducationDetailCreate {
	edc.mutation.SetCreatedAt(t)
	return edc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (edc *EducationDetailCreate) SetNillableCreatedAt(t *time.Time) *EducationDetailCreate {
	if t != nil {
		edc.SetCreatedAt(*t)
	}
	return edc
}

// SetUpdatedAt sets the "updated_at" field.
func (edc *EducationDetailCreate) SetUpdatedAt(t time.Time) *EducationDetailCreate {
	edc.mutation.SetUpdatedAt(t)
	return edc
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (edc *EducationDetailCreate) SetNillableUpdatedAt(t *time.Time) *EducationDetailCreate {
	if t != nil {
		edc.SetUpdatedAt(*t)
	}
	return edc
}

// SetID sets the "id" field.
func (edc *EducationDetailCreate) SetID(u uuid.UUID) *EducationDetailCreate {
	edc.mutation.SetID(u)
	return edc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (edc *EducationDetailCreate) SetNillableID(u *uuid.UUID) *EducationDetailCreate {
	if u != nil {
		edc.SetID(*u)
	}
	return edc
}

// SetEducation sets the "education" edge to the Education entity.
func (edc *EducationDetailCreate) SetEducation(e *Education) *EducationDetailCreate {
	return edc.SetEducationID(e.ID)
}

// AddTranslationIDs adds the "translations" edge to the EducationDetailTranslation entity by IDs.
func (edc *EducationDetailCreate) AddTranslationIDs(ids ...uuid.UUID) *EducationDetailCreate {
	edc.mutation.AddTranslationIDs(ids...)
	return edc
}

// AddTranslations adds the "translations" edges to the EducationDetailTranslation entity.
func (edc *EducationDetailCreate) AddTranslations(e ...*EducationDetailTranslation) *EducationDetailCreate {
	ids := make([]uuid.UUID, len(e))
	for i := range e {
		ids[i] = e[i].ID
	}
	return edc.AddTranslationIDs(ids...)
}

// Mutation returns the EducationDetailMutation object of the builder.
func (edc *EducationDetailCreate) Mutation() *EducationDetailMutation {
	return edc.mutation
}

// Save creates the EducationDetail in the database.
func (edc *EducationDetailCreate) Save(ctx context.Context) (*EducationDetail, error) {
	edc.defaults()
	return withHooks(ctx, edc.sqlSave, edc.mutation, edc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (edc *EducationDetailCreate) SaveX(ctx context.Context) *EducationDetail {
	v, err := edc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (edc *EducationDetailCreate) Exec(ctx context.Context) error {
	_, err := edc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (edc *EducationDetailCreate) ExecX(ctx context.Context) {
	if err := edc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (edc *EducationDetailCreate) defaults() {
	if _, ok := edc.mutation.SortOrder(); !ok {
		v := educationdetail.DefaultSortOrder
		edc.mutation.SetSortOrder(v)
	}
	if _, ok := edc.mutation.CreatedAt(); !ok {
		v := educationdetail.DefaultCreatedAt()
		edc.mutation.SetCreatedAt(v)
	}
	if _, ok := edc.mutation.UpdatedAt(); !ok {
		v := educationdetail.DefaultUpdatedAt()
		edc.mutation.SetUpdatedAt(v)
	}
	if _, ok := edc.mutation.ID(); !ok {
		v := educationdetail.DefaultID()
		edc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (edc *EducationDetailCreate) check() error {
	if _, ok := edc.mutation.EducationID(); !ok {
		return &ValidationError{Name: "education_id", err: errors.New(`ent: missing required field "EducationDetail.education_id"`)}
	}
	if _, ok := edc.mutation.DetailText(); !ok {
		return &ValidationError{Name: "detail_text", err: errors.New(`ent: missing required field "EducationDetail.detail_text"`)}
	}
	if v, ok := edc.mutation.DetailText(); ok {
		if err := educationdetail.DetailTextValidator(v); err != nil {
			return &ValidationError{Name: "detail_text", err: fmt.Errorf(`ent: validator failed for field "EducationDetail.detail_text": %w`, err)}
		}
	}
	if _, ok := edc.mutation.SortOrder(); !ok {
		return &ValidationError{Name: "sort_order", err: errors.New(`ent: missing required field "EducationDetail.sort_order"`)}
	}
	if _, ok := edc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "EducationDetail.created_at"`)}
	}
	if _, ok := edc.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "EducationDetail.updated_at"`)}
	}
	if len(edc.mutation.EducationIDs()) == 0 {
		return &ValidationError{Name: "education", err: errors.New(`ent: missing required edge "EducationDetail.education"`)}
	}
	return nil
}

func (edc *EducationDetailCreate) sqlSave(ctx context.Context) (*EducationDetail, error) {
	if err := edc.check(); err != nil {
		return nil, err
	}
	_node, _spec := edc.createSpec()
	if err := sqlgraph.CreateNode(ctx, edc.driver, _spec); err != nil {
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
	edc.mutation.id = &_node.ID
	edc.mutation.done = true
	return _node, nil
}

func (edc *EducationDetailCreate) createSpec() (*EducationDetail, *sqlgraph.CreateSpec) {
	var (
		_node = &EducationDetail{config: edc.config}
		_spec = sqlgraph.NewCreateSpec(educationdetail.Table, sqlgraph.NewFieldSpec(educationdetail.FieldID, field.TypeUUID))
	)
	if id, ok := edc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := edc.mutation.DetailText(); ok {
		_spec.SetField(educationdetail.FieldDetailText, field.TypeString, value)
		_node.DetailText = value
	}
	if value, ok := edc.mutation.SortOrder(); ok {
		_spec.SetField(educationdetail.FieldSortOrder, field.TypeInt, value)
		_node.SortOrder = value
	}
	if value, ok := edc.mutation.CreatedAt(); ok {
		_spec.SetField(educationdetail.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if value, ok := edc.mutation.UpdatedAt(); ok {
		_spec.SetField(educationdetail.FieldUpdatedAt, field.TypeTime, value)
		_node.UpdatedAt = value
	}
	if nodes := edc.mutation.EducationIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   educationdetail.EducationTable,
			Columns: []string{educationdetail.EducationColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(education.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.EducationID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := edc.mutation.TranslationsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   educationdetail.TranslationsTable,
			Columns: []string{educationdetail.TranslationsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(educationdetailtranslation.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// EducationDetailCreateBulk is the builder for creating many EducationDetail entities in bulk.
type EducationDetailCreateBulk struct {
	config
	err      error
	builders []*EducationDetailCreate
}

// Save creates the EducationDetail entities in the database.
func (edcb *EducationDetailCreateBulk) Save(ctx context.Context) ([]*EducationDetail, error) {
	if edcb.err != nil {
		return nil, edcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(edcb.builders))
	nodes := make([]*EducationDetail, len(edcb.builders))
	mutators := make([]Mutator, len(edcb.builders))
	for i := range edcb.builders {
		func(i int, root context.Context) {
			builder := edcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*EducationDetailMutation)
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
					_, err = mutators[i+1].Mutate(root, edcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, edcb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, edcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (edcb *EducationDetailCreateBulk) SaveX(ctx context.Context) []*EducationDetail {
	v, err := edcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (edcb *EducationDetailCreateBulk) Exec(ctx context.Context) error {
	_, err := edcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (edcb *EducationDetailCreateBulk) ExecX(ctx context.Context) {
	if err := edcb.Exec(ctx); err != nil {
		panic(err)
	}
}

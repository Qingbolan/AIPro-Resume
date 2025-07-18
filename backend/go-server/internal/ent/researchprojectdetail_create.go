// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/researchproject"
	"silan-backend/internal/ent/researchprojectdetail"
	"silan-backend/internal/ent/researchprojectdetailtranslation"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// ResearchProjectDetailCreate is the builder for creating a ResearchProjectDetail entity.
type ResearchProjectDetailCreate struct {
	config
	mutation *ResearchProjectDetailMutation
	hooks    []Hook
}

// SetResearchProjectID sets the "research_project_id" field.
func (rpdc *ResearchProjectDetailCreate) SetResearchProjectID(u uuid.UUID) *ResearchProjectDetailCreate {
	rpdc.mutation.SetResearchProjectID(u)
	return rpdc
}

// SetDetailText sets the "detail_text" field.
func (rpdc *ResearchProjectDetailCreate) SetDetailText(s string) *ResearchProjectDetailCreate {
	rpdc.mutation.SetDetailText(s)
	return rpdc
}

// SetSortOrder sets the "sort_order" field.
func (rpdc *ResearchProjectDetailCreate) SetSortOrder(i int) *ResearchProjectDetailCreate {
	rpdc.mutation.SetSortOrder(i)
	return rpdc
}

// SetNillableSortOrder sets the "sort_order" field if the given value is not nil.
func (rpdc *ResearchProjectDetailCreate) SetNillableSortOrder(i *int) *ResearchProjectDetailCreate {
	if i != nil {
		rpdc.SetSortOrder(*i)
	}
	return rpdc
}

// SetCreatedAt sets the "created_at" field.
func (rpdc *ResearchProjectDetailCreate) SetCreatedAt(t time.Time) *ResearchProjectDetailCreate {
	rpdc.mutation.SetCreatedAt(t)
	return rpdc
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (rpdc *ResearchProjectDetailCreate) SetNillableCreatedAt(t *time.Time) *ResearchProjectDetailCreate {
	if t != nil {
		rpdc.SetCreatedAt(*t)
	}
	return rpdc
}

// SetUpdatedAt sets the "updated_at" field.
func (rpdc *ResearchProjectDetailCreate) SetUpdatedAt(t time.Time) *ResearchProjectDetailCreate {
	rpdc.mutation.SetUpdatedAt(t)
	return rpdc
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (rpdc *ResearchProjectDetailCreate) SetNillableUpdatedAt(t *time.Time) *ResearchProjectDetailCreate {
	if t != nil {
		rpdc.SetUpdatedAt(*t)
	}
	return rpdc
}

// SetID sets the "id" field.
func (rpdc *ResearchProjectDetailCreate) SetID(u uuid.UUID) *ResearchProjectDetailCreate {
	rpdc.mutation.SetID(u)
	return rpdc
}

// SetNillableID sets the "id" field if the given value is not nil.
func (rpdc *ResearchProjectDetailCreate) SetNillableID(u *uuid.UUID) *ResearchProjectDetailCreate {
	if u != nil {
		rpdc.SetID(*u)
	}
	return rpdc
}

// SetResearchProject sets the "research_project" edge to the ResearchProject entity.
func (rpdc *ResearchProjectDetailCreate) SetResearchProject(r *ResearchProject) *ResearchProjectDetailCreate {
	return rpdc.SetResearchProjectID(r.ID)
}

// AddTranslationIDs adds the "translations" edge to the ResearchProjectDetailTranslation entity by IDs.
func (rpdc *ResearchProjectDetailCreate) AddTranslationIDs(ids ...uuid.UUID) *ResearchProjectDetailCreate {
	rpdc.mutation.AddTranslationIDs(ids...)
	return rpdc
}

// AddTranslations adds the "translations" edges to the ResearchProjectDetailTranslation entity.
func (rpdc *ResearchProjectDetailCreate) AddTranslations(r ...*ResearchProjectDetailTranslation) *ResearchProjectDetailCreate {
	ids := make([]uuid.UUID, len(r))
	for i := range r {
		ids[i] = r[i].ID
	}
	return rpdc.AddTranslationIDs(ids...)
}

// Mutation returns the ResearchProjectDetailMutation object of the builder.
func (rpdc *ResearchProjectDetailCreate) Mutation() *ResearchProjectDetailMutation {
	return rpdc.mutation
}

// Save creates the ResearchProjectDetail in the database.
func (rpdc *ResearchProjectDetailCreate) Save(ctx context.Context) (*ResearchProjectDetail, error) {
	rpdc.defaults()
	return withHooks(ctx, rpdc.sqlSave, rpdc.mutation, rpdc.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (rpdc *ResearchProjectDetailCreate) SaveX(ctx context.Context) *ResearchProjectDetail {
	v, err := rpdc.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (rpdc *ResearchProjectDetailCreate) Exec(ctx context.Context) error {
	_, err := rpdc.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rpdc *ResearchProjectDetailCreate) ExecX(ctx context.Context) {
	if err := rpdc.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (rpdc *ResearchProjectDetailCreate) defaults() {
	if _, ok := rpdc.mutation.SortOrder(); !ok {
		v := researchprojectdetail.DefaultSortOrder
		rpdc.mutation.SetSortOrder(v)
	}
	if _, ok := rpdc.mutation.CreatedAt(); !ok {
		v := researchprojectdetail.DefaultCreatedAt()
		rpdc.mutation.SetCreatedAt(v)
	}
	if _, ok := rpdc.mutation.UpdatedAt(); !ok {
		v := researchprojectdetail.DefaultUpdatedAt()
		rpdc.mutation.SetUpdatedAt(v)
	}
	if _, ok := rpdc.mutation.ID(); !ok {
		v := researchprojectdetail.DefaultID()
		rpdc.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (rpdc *ResearchProjectDetailCreate) check() error {
	if _, ok := rpdc.mutation.ResearchProjectID(); !ok {
		return &ValidationError{Name: "research_project_id", err: errors.New(`ent: missing required field "ResearchProjectDetail.research_project_id"`)}
	}
	if _, ok := rpdc.mutation.DetailText(); !ok {
		return &ValidationError{Name: "detail_text", err: errors.New(`ent: missing required field "ResearchProjectDetail.detail_text"`)}
	}
	if v, ok := rpdc.mutation.DetailText(); ok {
		if err := researchprojectdetail.DetailTextValidator(v); err != nil {
			return &ValidationError{Name: "detail_text", err: fmt.Errorf(`ent: validator failed for field "ResearchProjectDetail.detail_text": %w`, err)}
		}
	}
	if _, ok := rpdc.mutation.SortOrder(); !ok {
		return &ValidationError{Name: "sort_order", err: errors.New(`ent: missing required field "ResearchProjectDetail.sort_order"`)}
	}
	if _, ok := rpdc.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "ResearchProjectDetail.created_at"`)}
	}
	if _, ok := rpdc.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "ResearchProjectDetail.updated_at"`)}
	}
	if len(rpdc.mutation.ResearchProjectIDs()) == 0 {
		return &ValidationError{Name: "research_project", err: errors.New(`ent: missing required edge "ResearchProjectDetail.research_project"`)}
	}
	return nil
}

func (rpdc *ResearchProjectDetailCreate) sqlSave(ctx context.Context) (*ResearchProjectDetail, error) {
	if err := rpdc.check(); err != nil {
		return nil, err
	}
	_node, _spec := rpdc.createSpec()
	if err := sqlgraph.CreateNode(ctx, rpdc.driver, _spec); err != nil {
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
	rpdc.mutation.id = &_node.ID
	rpdc.mutation.done = true
	return _node, nil
}

func (rpdc *ResearchProjectDetailCreate) createSpec() (*ResearchProjectDetail, *sqlgraph.CreateSpec) {
	var (
		_node = &ResearchProjectDetail{config: rpdc.config}
		_spec = sqlgraph.NewCreateSpec(researchprojectdetail.Table, sqlgraph.NewFieldSpec(researchprojectdetail.FieldID, field.TypeUUID))
	)
	if id, ok := rpdc.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := rpdc.mutation.DetailText(); ok {
		_spec.SetField(researchprojectdetail.FieldDetailText, field.TypeString, value)
		_node.DetailText = value
	}
	if value, ok := rpdc.mutation.SortOrder(); ok {
		_spec.SetField(researchprojectdetail.FieldSortOrder, field.TypeInt, value)
		_node.SortOrder = value
	}
	if value, ok := rpdc.mutation.CreatedAt(); ok {
		_spec.SetField(researchprojectdetail.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if value, ok := rpdc.mutation.UpdatedAt(); ok {
		_spec.SetField(researchprojectdetail.FieldUpdatedAt, field.TypeTime, value)
		_node.UpdatedAt = value
	}
	if nodes := rpdc.mutation.ResearchProjectIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   researchprojectdetail.ResearchProjectTable,
			Columns: []string{researchprojectdetail.ResearchProjectColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(researchproject.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.ResearchProjectID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := rpdc.mutation.TranslationsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   researchprojectdetail.TranslationsTable,
			Columns: []string{researchprojectdetail.TranslationsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(researchprojectdetailtranslation.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// ResearchProjectDetailCreateBulk is the builder for creating many ResearchProjectDetail entities in bulk.
type ResearchProjectDetailCreateBulk struct {
	config
	err      error
	builders []*ResearchProjectDetailCreate
}

// Save creates the ResearchProjectDetail entities in the database.
func (rpdcb *ResearchProjectDetailCreateBulk) Save(ctx context.Context) ([]*ResearchProjectDetail, error) {
	if rpdcb.err != nil {
		return nil, rpdcb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(rpdcb.builders))
	nodes := make([]*ResearchProjectDetail, len(rpdcb.builders))
	mutators := make([]Mutator, len(rpdcb.builders))
	for i := range rpdcb.builders {
		func(i int, root context.Context) {
			builder := rpdcb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*ResearchProjectDetailMutation)
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
					_, err = mutators[i+1].Mutate(root, rpdcb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, rpdcb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, rpdcb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (rpdcb *ResearchProjectDetailCreateBulk) SaveX(ctx context.Context) []*ResearchProjectDetail {
	v, err := rpdcb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (rpdcb *ResearchProjectDetailCreateBulk) Exec(ctx context.Context) error {
	_, err := rpdcb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (rpdcb *ResearchProjectDetailCreateBulk) ExecX(ctx context.Context) {
	if err := rpdcb.Exec(ctx); err != nil {
		panic(err)
	}
}

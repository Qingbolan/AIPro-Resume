// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"errors"
	"fmt"
	"silan-backend/internal/ent/award"
	"silan-backend/internal/ent/awardtranslation"
	"silan-backend/internal/ent/user"
	"time"

	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// AwardCreate is the builder for creating a Award entity.
type AwardCreate struct {
	config
	mutation *AwardMutation
	hooks    []Hook
}

// SetUserID sets the "user_id" field.
func (ac *AwardCreate) SetUserID(u uuid.UUID) *AwardCreate {
	ac.mutation.SetUserID(u)
	return ac
}

// SetTitle sets the "title" field.
func (ac *AwardCreate) SetTitle(s string) *AwardCreate {
	ac.mutation.SetTitle(s)
	return ac
}

// SetAwardingOrganization sets the "awarding_organization" field.
func (ac *AwardCreate) SetAwardingOrganization(s string) *AwardCreate {
	ac.mutation.SetAwardingOrganization(s)
	return ac
}

// SetAwardDate sets the "award_date" field.
func (ac *AwardCreate) SetAwardDate(t time.Time) *AwardCreate {
	ac.mutation.SetAwardDate(t)
	return ac
}

// SetNillableAwardDate sets the "award_date" field if the given value is not nil.
func (ac *AwardCreate) SetNillableAwardDate(t *time.Time) *AwardCreate {
	if t != nil {
		ac.SetAwardDate(*t)
	}
	return ac
}

// SetAwardType sets the "award_type" field.
func (ac *AwardCreate) SetAwardType(s string) *AwardCreate {
	ac.mutation.SetAwardType(s)
	return ac
}

// SetNillableAwardType sets the "award_type" field if the given value is not nil.
func (ac *AwardCreate) SetNillableAwardType(s *string) *AwardCreate {
	if s != nil {
		ac.SetAwardType(*s)
	}
	return ac
}

// SetAmount sets the "amount" field.
func (ac *AwardCreate) SetAmount(f float64) *AwardCreate {
	ac.mutation.SetAmount(f)
	return ac
}

// SetNillableAmount sets the "amount" field if the given value is not nil.
func (ac *AwardCreate) SetNillableAmount(f *float64) *AwardCreate {
	if f != nil {
		ac.SetAmount(*f)
	}
	return ac
}

// SetDescription sets the "description" field.
func (ac *AwardCreate) SetDescription(s string) *AwardCreate {
	ac.mutation.SetDescription(s)
	return ac
}

// SetNillableDescription sets the "description" field if the given value is not nil.
func (ac *AwardCreate) SetNillableDescription(s *string) *AwardCreate {
	if s != nil {
		ac.SetDescription(*s)
	}
	return ac
}

// SetCertificateURL sets the "certificate_url" field.
func (ac *AwardCreate) SetCertificateURL(s string) *AwardCreate {
	ac.mutation.SetCertificateURL(s)
	return ac
}

// SetNillableCertificateURL sets the "certificate_url" field if the given value is not nil.
func (ac *AwardCreate) SetNillableCertificateURL(s *string) *AwardCreate {
	if s != nil {
		ac.SetCertificateURL(*s)
	}
	return ac
}

// SetSortOrder sets the "sort_order" field.
func (ac *AwardCreate) SetSortOrder(i int) *AwardCreate {
	ac.mutation.SetSortOrder(i)
	return ac
}

// SetNillableSortOrder sets the "sort_order" field if the given value is not nil.
func (ac *AwardCreate) SetNillableSortOrder(i *int) *AwardCreate {
	if i != nil {
		ac.SetSortOrder(*i)
	}
	return ac
}

// SetCreatedAt sets the "created_at" field.
func (ac *AwardCreate) SetCreatedAt(t time.Time) *AwardCreate {
	ac.mutation.SetCreatedAt(t)
	return ac
}

// SetNillableCreatedAt sets the "created_at" field if the given value is not nil.
func (ac *AwardCreate) SetNillableCreatedAt(t *time.Time) *AwardCreate {
	if t != nil {
		ac.SetCreatedAt(*t)
	}
	return ac
}

// SetUpdatedAt sets the "updated_at" field.
func (ac *AwardCreate) SetUpdatedAt(t time.Time) *AwardCreate {
	ac.mutation.SetUpdatedAt(t)
	return ac
}

// SetNillableUpdatedAt sets the "updated_at" field if the given value is not nil.
func (ac *AwardCreate) SetNillableUpdatedAt(t *time.Time) *AwardCreate {
	if t != nil {
		ac.SetUpdatedAt(*t)
	}
	return ac
}

// SetID sets the "id" field.
func (ac *AwardCreate) SetID(u uuid.UUID) *AwardCreate {
	ac.mutation.SetID(u)
	return ac
}

// SetNillableID sets the "id" field if the given value is not nil.
func (ac *AwardCreate) SetNillableID(u *uuid.UUID) *AwardCreate {
	if u != nil {
		ac.SetID(*u)
	}
	return ac
}

// SetUser sets the "user" edge to the User entity.
func (ac *AwardCreate) SetUser(u *User) *AwardCreate {
	return ac.SetUserID(u.ID)
}

// AddTranslationIDs adds the "translations" edge to the AwardTranslation entity by IDs.
func (ac *AwardCreate) AddTranslationIDs(ids ...uuid.UUID) *AwardCreate {
	ac.mutation.AddTranslationIDs(ids...)
	return ac
}

// AddTranslations adds the "translations" edges to the AwardTranslation entity.
func (ac *AwardCreate) AddTranslations(a ...*AwardTranslation) *AwardCreate {
	ids := make([]uuid.UUID, len(a))
	for i := range a {
		ids[i] = a[i].ID
	}
	return ac.AddTranslationIDs(ids...)
}

// Mutation returns the AwardMutation object of the builder.
func (ac *AwardCreate) Mutation() *AwardMutation {
	return ac.mutation
}

// Save creates the Award in the database.
func (ac *AwardCreate) Save(ctx context.Context) (*Award, error) {
	ac.defaults()
	return withHooks(ctx, ac.sqlSave, ac.mutation, ac.hooks)
}

// SaveX calls Save and panics if Save returns an error.
func (ac *AwardCreate) SaveX(ctx context.Context) *Award {
	v, err := ac.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (ac *AwardCreate) Exec(ctx context.Context) error {
	_, err := ac.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (ac *AwardCreate) ExecX(ctx context.Context) {
	if err := ac.Exec(ctx); err != nil {
		panic(err)
	}
}

// defaults sets the default values of the builder before save.
func (ac *AwardCreate) defaults() {
	if _, ok := ac.mutation.SortOrder(); !ok {
		v := award.DefaultSortOrder
		ac.mutation.SetSortOrder(v)
	}
	if _, ok := ac.mutation.CreatedAt(); !ok {
		v := award.DefaultCreatedAt()
		ac.mutation.SetCreatedAt(v)
	}
	if _, ok := ac.mutation.UpdatedAt(); !ok {
		v := award.DefaultUpdatedAt()
		ac.mutation.SetUpdatedAt(v)
	}
	if _, ok := ac.mutation.ID(); !ok {
		v := award.DefaultID()
		ac.mutation.SetID(v)
	}
}

// check runs all checks and user-defined validators on the builder.
func (ac *AwardCreate) check() error {
	if _, ok := ac.mutation.UserID(); !ok {
		return &ValidationError{Name: "user_id", err: errors.New(`ent: missing required field "Award.user_id"`)}
	}
	if _, ok := ac.mutation.Title(); !ok {
		return &ValidationError{Name: "title", err: errors.New(`ent: missing required field "Award.title"`)}
	}
	if v, ok := ac.mutation.Title(); ok {
		if err := award.TitleValidator(v); err != nil {
			return &ValidationError{Name: "title", err: fmt.Errorf(`ent: validator failed for field "Award.title": %w`, err)}
		}
	}
	if _, ok := ac.mutation.AwardingOrganization(); !ok {
		return &ValidationError{Name: "awarding_organization", err: errors.New(`ent: missing required field "Award.awarding_organization"`)}
	}
	if v, ok := ac.mutation.AwardingOrganization(); ok {
		if err := award.AwardingOrganizationValidator(v); err != nil {
			return &ValidationError{Name: "awarding_organization", err: fmt.Errorf(`ent: validator failed for field "Award.awarding_organization": %w`, err)}
		}
	}
	if v, ok := ac.mutation.AwardType(); ok {
		if err := award.AwardTypeValidator(v); err != nil {
			return &ValidationError{Name: "award_type", err: fmt.Errorf(`ent: validator failed for field "Award.award_type": %w`, err)}
		}
	}
	if v, ok := ac.mutation.CertificateURL(); ok {
		if err := award.CertificateURLValidator(v); err != nil {
			return &ValidationError{Name: "certificate_url", err: fmt.Errorf(`ent: validator failed for field "Award.certificate_url": %w`, err)}
		}
	}
	if _, ok := ac.mutation.SortOrder(); !ok {
		return &ValidationError{Name: "sort_order", err: errors.New(`ent: missing required field "Award.sort_order"`)}
	}
	if _, ok := ac.mutation.CreatedAt(); !ok {
		return &ValidationError{Name: "created_at", err: errors.New(`ent: missing required field "Award.created_at"`)}
	}
	if _, ok := ac.mutation.UpdatedAt(); !ok {
		return &ValidationError{Name: "updated_at", err: errors.New(`ent: missing required field "Award.updated_at"`)}
	}
	if len(ac.mutation.UserIDs()) == 0 {
		return &ValidationError{Name: "user", err: errors.New(`ent: missing required edge "Award.user"`)}
	}
	return nil
}

func (ac *AwardCreate) sqlSave(ctx context.Context) (*Award, error) {
	if err := ac.check(); err != nil {
		return nil, err
	}
	_node, _spec := ac.createSpec()
	if err := sqlgraph.CreateNode(ctx, ac.driver, _spec); err != nil {
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
	ac.mutation.id = &_node.ID
	ac.mutation.done = true
	return _node, nil
}

func (ac *AwardCreate) createSpec() (*Award, *sqlgraph.CreateSpec) {
	var (
		_node = &Award{config: ac.config}
		_spec = sqlgraph.NewCreateSpec(award.Table, sqlgraph.NewFieldSpec(award.FieldID, field.TypeUUID))
	)
	if id, ok := ac.mutation.ID(); ok {
		_node.ID = id
		_spec.ID.Value = &id
	}
	if value, ok := ac.mutation.Title(); ok {
		_spec.SetField(award.FieldTitle, field.TypeString, value)
		_node.Title = value
	}
	if value, ok := ac.mutation.AwardingOrganization(); ok {
		_spec.SetField(award.FieldAwardingOrganization, field.TypeString, value)
		_node.AwardingOrganization = value
	}
	if value, ok := ac.mutation.AwardDate(); ok {
		_spec.SetField(award.FieldAwardDate, field.TypeTime, value)
		_node.AwardDate = value
	}
	if value, ok := ac.mutation.AwardType(); ok {
		_spec.SetField(award.FieldAwardType, field.TypeString, value)
		_node.AwardType = value
	}
	if value, ok := ac.mutation.Amount(); ok {
		_spec.SetField(award.FieldAmount, field.TypeFloat64, value)
		_node.Amount = value
	}
	if value, ok := ac.mutation.Description(); ok {
		_spec.SetField(award.FieldDescription, field.TypeString, value)
		_node.Description = value
	}
	if value, ok := ac.mutation.CertificateURL(); ok {
		_spec.SetField(award.FieldCertificateURL, field.TypeString, value)
		_node.CertificateURL = value
	}
	if value, ok := ac.mutation.SortOrder(); ok {
		_spec.SetField(award.FieldSortOrder, field.TypeInt, value)
		_node.SortOrder = value
	}
	if value, ok := ac.mutation.CreatedAt(); ok {
		_spec.SetField(award.FieldCreatedAt, field.TypeTime, value)
		_node.CreatedAt = value
	}
	if value, ok := ac.mutation.UpdatedAt(); ok {
		_spec.SetField(award.FieldUpdatedAt, field.TypeTime, value)
		_node.UpdatedAt = value
	}
	if nodes := ac.mutation.UserIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.M2O,
			Inverse: true,
			Table:   award.UserTable,
			Columns: []string{award.UserColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(user.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_node.UserID = nodes[0]
		_spec.Edges = append(_spec.Edges, edge)
	}
	if nodes := ac.mutation.TranslationsIDs(); len(nodes) > 0 {
		edge := &sqlgraph.EdgeSpec{
			Rel:     sqlgraph.O2M,
			Inverse: false,
			Table:   award.TranslationsTable,
			Columns: []string{award.TranslationsColumn},
			Bidi:    false,
			Target: &sqlgraph.EdgeTarget{
				IDSpec: sqlgraph.NewFieldSpec(awardtranslation.FieldID, field.TypeUUID),
			},
		}
		for _, k := range nodes {
			edge.Target.Nodes = append(edge.Target.Nodes, k)
		}
		_spec.Edges = append(_spec.Edges, edge)
	}
	return _node, _spec
}

// AwardCreateBulk is the builder for creating many Award entities in bulk.
type AwardCreateBulk struct {
	config
	err      error
	builders []*AwardCreate
}

// Save creates the Award entities in the database.
func (acb *AwardCreateBulk) Save(ctx context.Context) ([]*Award, error) {
	if acb.err != nil {
		return nil, acb.err
	}
	specs := make([]*sqlgraph.CreateSpec, len(acb.builders))
	nodes := make([]*Award, len(acb.builders))
	mutators := make([]Mutator, len(acb.builders))
	for i := range acb.builders {
		func(i int, root context.Context) {
			builder := acb.builders[i]
			builder.defaults()
			var mut Mutator = MutateFunc(func(ctx context.Context, m Mutation) (Value, error) {
				mutation, ok := m.(*AwardMutation)
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
					_, err = mutators[i+1].Mutate(root, acb.builders[i+1].mutation)
				} else {
					spec := &sqlgraph.BatchCreateSpec{Nodes: specs}
					// Invoke the actual operation on the latest mutation in the chain.
					if err = sqlgraph.BatchCreate(ctx, acb.driver, spec); err != nil {
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
		if _, err := mutators[0].Mutate(ctx, acb.builders[0].mutation); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

// SaveX is like Save, but panics if an error occurs.
func (acb *AwardCreateBulk) SaveX(ctx context.Context) []*Award {
	v, err := acb.Save(ctx)
	if err != nil {
		panic(err)
	}
	return v
}

// Exec executes the query.
func (acb *AwardCreateBulk) Exec(ctx context.Context) error {
	_, err := acb.Save(ctx)
	return err
}

// ExecX is like Exec, but panics if an error occurs.
func (acb *AwardCreateBulk) ExecX(ctx context.Context) {
	if err := acb.Exec(ctx); err != nil {
		panic(err)
	}
}

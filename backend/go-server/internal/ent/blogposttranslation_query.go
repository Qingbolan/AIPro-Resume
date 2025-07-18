// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"fmt"
	"math"
	"silan-backend/internal/ent/blogpost"
	"silan-backend/internal/ent/blogposttranslation"
	"silan-backend/internal/ent/language"
	"silan-backend/internal/ent/predicate"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogPostTranslationQuery is the builder for querying BlogPostTranslation entities.
type BlogPostTranslationQuery struct {
	config
	ctx          *QueryContext
	order        []blogposttranslation.OrderOption
	inters       []Interceptor
	predicates   []predicate.BlogPostTranslation
	withBlogPost *BlogPostQuery
	withLanguage *LanguageQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the BlogPostTranslationQuery builder.
func (bptq *BlogPostTranslationQuery) Where(ps ...predicate.BlogPostTranslation) *BlogPostTranslationQuery {
	bptq.predicates = append(bptq.predicates, ps...)
	return bptq
}

// Limit the number of records to be returned by this query.
func (bptq *BlogPostTranslationQuery) Limit(limit int) *BlogPostTranslationQuery {
	bptq.ctx.Limit = &limit
	return bptq
}

// Offset to start from.
func (bptq *BlogPostTranslationQuery) Offset(offset int) *BlogPostTranslationQuery {
	bptq.ctx.Offset = &offset
	return bptq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (bptq *BlogPostTranslationQuery) Unique(unique bool) *BlogPostTranslationQuery {
	bptq.ctx.Unique = &unique
	return bptq
}

// Order specifies how the records should be ordered.
func (bptq *BlogPostTranslationQuery) Order(o ...blogposttranslation.OrderOption) *BlogPostTranslationQuery {
	bptq.order = append(bptq.order, o...)
	return bptq
}

// QueryBlogPost chains the current query on the "blog_post" edge.
func (bptq *BlogPostTranslationQuery) QueryBlogPost() *BlogPostQuery {
	query := (&BlogPostClient{config: bptq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := bptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := bptq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(blogposttranslation.Table, blogposttranslation.FieldID, selector),
			sqlgraph.To(blogpost.Table, blogpost.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, blogposttranslation.BlogPostTable, blogposttranslation.BlogPostColumn),
		)
		fromU = sqlgraph.SetNeighbors(bptq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryLanguage chains the current query on the "language" edge.
func (bptq *BlogPostTranslationQuery) QueryLanguage() *LanguageQuery {
	query := (&LanguageClient{config: bptq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := bptq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := bptq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(blogposttranslation.Table, blogposttranslation.FieldID, selector),
			sqlgraph.To(language.Table, language.FieldID),
			sqlgraph.Edge(sqlgraph.M2O, true, blogposttranslation.LanguageTable, blogposttranslation.LanguageColumn),
		)
		fromU = sqlgraph.SetNeighbors(bptq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first BlogPostTranslation entity from the query.
// Returns a *NotFoundError when no BlogPostTranslation was found.
func (bptq *BlogPostTranslationQuery) First(ctx context.Context) (*BlogPostTranslation, error) {
	nodes, err := bptq.Limit(1).All(setContextOp(ctx, bptq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{blogposttranslation.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) FirstX(ctx context.Context) *BlogPostTranslation {
	node, err := bptq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first BlogPostTranslation ID from the query.
// Returns a *NotFoundError when no BlogPostTranslation ID was found.
func (bptq *BlogPostTranslationQuery) FirstID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = bptq.Limit(1).IDs(setContextOp(ctx, bptq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{blogposttranslation.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) FirstIDX(ctx context.Context) uuid.UUID {
	id, err := bptq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single BlogPostTranslation entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one BlogPostTranslation entity is found.
// Returns a *NotFoundError when no BlogPostTranslation entities are found.
func (bptq *BlogPostTranslationQuery) Only(ctx context.Context) (*BlogPostTranslation, error) {
	nodes, err := bptq.Limit(2).All(setContextOp(ctx, bptq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{blogposttranslation.Label}
	default:
		return nil, &NotSingularError{blogposttranslation.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) OnlyX(ctx context.Context) *BlogPostTranslation {
	node, err := bptq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only BlogPostTranslation ID in the query.
// Returns a *NotSingularError when more than one BlogPostTranslation ID is found.
// Returns a *NotFoundError when no entities are found.
func (bptq *BlogPostTranslationQuery) OnlyID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = bptq.Limit(2).IDs(setContextOp(ctx, bptq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{blogposttranslation.Label}
	default:
		err = &NotSingularError{blogposttranslation.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) OnlyIDX(ctx context.Context) uuid.UUID {
	id, err := bptq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of BlogPostTranslations.
func (bptq *BlogPostTranslationQuery) All(ctx context.Context) ([]*BlogPostTranslation, error) {
	ctx = setContextOp(ctx, bptq.ctx, ent.OpQueryAll)
	if err := bptq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*BlogPostTranslation, *BlogPostTranslationQuery]()
	return withInterceptors[[]*BlogPostTranslation](ctx, bptq, qr, bptq.inters)
}

// AllX is like All, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) AllX(ctx context.Context) []*BlogPostTranslation {
	nodes, err := bptq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of BlogPostTranslation IDs.
func (bptq *BlogPostTranslationQuery) IDs(ctx context.Context) (ids []uuid.UUID, err error) {
	if bptq.ctx.Unique == nil && bptq.path != nil {
		bptq.Unique(true)
	}
	ctx = setContextOp(ctx, bptq.ctx, ent.OpQueryIDs)
	if err = bptq.Select(blogposttranslation.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) IDsX(ctx context.Context) []uuid.UUID {
	ids, err := bptq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (bptq *BlogPostTranslationQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, bptq.ctx, ent.OpQueryCount)
	if err := bptq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, bptq, querierCount[*BlogPostTranslationQuery](), bptq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) CountX(ctx context.Context) int {
	count, err := bptq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (bptq *BlogPostTranslationQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, bptq.ctx, ent.OpQueryExist)
	switch _, err := bptq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (bptq *BlogPostTranslationQuery) ExistX(ctx context.Context) bool {
	exist, err := bptq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the BlogPostTranslationQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (bptq *BlogPostTranslationQuery) Clone() *BlogPostTranslationQuery {
	if bptq == nil {
		return nil
	}
	return &BlogPostTranslationQuery{
		config:       bptq.config,
		ctx:          bptq.ctx.Clone(),
		order:        append([]blogposttranslation.OrderOption{}, bptq.order...),
		inters:       append([]Interceptor{}, bptq.inters...),
		predicates:   append([]predicate.BlogPostTranslation{}, bptq.predicates...),
		withBlogPost: bptq.withBlogPost.Clone(),
		withLanguage: bptq.withLanguage.Clone(),
		// clone intermediate query.
		sql:  bptq.sql.Clone(),
		path: bptq.path,
	}
}

// WithBlogPost tells the query-builder to eager-load the nodes that are connected to
// the "blog_post" edge. The optional arguments are used to configure the query builder of the edge.
func (bptq *BlogPostTranslationQuery) WithBlogPost(opts ...func(*BlogPostQuery)) *BlogPostTranslationQuery {
	query := (&BlogPostClient{config: bptq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	bptq.withBlogPost = query
	return bptq
}

// WithLanguage tells the query-builder to eager-load the nodes that are connected to
// the "language" edge. The optional arguments are used to configure the query builder of the edge.
func (bptq *BlogPostTranslationQuery) WithLanguage(opts ...func(*LanguageQuery)) *BlogPostTranslationQuery {
	query := (&LanguageClient{config: bptq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	bptq.withLanguage = query
	return bptq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		BlogPostID uuid.UUID `json:"blog_post_id,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.BlogPostTranslation.Query().
//		GroupBy(blogposttranslation.FieldBlogPostID).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (bptq *BlogPostTranslationQuery) GroupBy(field string, fields ...string) *BlogPostTranslationGroupBy {
	bptq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &BlogPostTranslationGroupBy{build: bptq}
	grbuild.flds = &bptq.ctx.Fields
	grbuild.label = blogposttranslation.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		BlogPostID uuid.UUID `json:"blog_post_id,omitempty"`
//	}
//
//	client.BlogPostTranslation.Query().
//		Select(blogposttranslation.FieldBlogPostID).
//		Scan(ctx, &v)
func (bptq *BlogPostTranslationQuery) Select(fields ...string) *BlogPostTranslationSelect {
	bptq.ctx.Fields = append(bptq.ctx.Fields, fields...)
	sbuild := &BlogPostTranslationSelect{BlogPostTranslationQuery: bptq}
	sbuild.label = blogposttranslation.Label
	sbuild.flds, sbuild.scan = &bptq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a BlogPostTranslationSelect configured with the given aggregations.
func (bptq *BlogPostTranslationQuery) Aggregate(fns ...AggregateFunc) *BlogPostTranslationSelect {
	return bptq.Select().Aggregate(fns...)
}

func (bptq *BlogPostTranslationQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range bptq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, bptq); err != nil {
				return err
			}
		}
	}
	for _, f := range bptq.ctx.Fields {
		if !blogposttranslation.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if bptq.path != nil {
		prev, err := bptq.path(ctx)
		if err != nil {
			return err
		}
		bptq.sql = prev
	}
	return nil
}

func (bptq *BlogPostTranslationQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*BlogPostTranslation, error) {
	var (
		nodes       = []*BlogPostTranslation{}
		_spec       = bptq.querySpec()
		loadedTypes = [2]bool{
			bptq.withBlogPost != nil,
			bptq.withLanguage != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*BlogPostTranslation).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &BlogPostTranslation{config: bptq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, bptq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := bptq.withBlogPost; query != nil {
		if err := bptq.loadBlogPost(ctx, query, nodes, nil,
			func(n *BlogPostTranslation, e *BlogPost) { n.Edges.BlogPost = e }); err != nil {
			return nil, err
		}
	}
	if query := bptq.withLanguage; query != nil {
		if err := bptq.loadLanguage(ctx, query, nodes, nil,
			func(n *BlogPostTranslation, e *Language) { n.Edges.Language = e }); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (bptq *BlogPostTranslationQuery) loadBlogPost(ctx context.Context, query *BlogPostQuery, nodes []*BlogPostTranslation, init func(*BlogPostTranslation), assign func(*BlogPostTranslation, *BlogPost)) error {
	ids := make([]uuid.UUID, 0, len(nodes))
	nodeids := make(map[uuid.UUID][]*BlogPostTranslation)
	for i := range nodes {
		fk := nodes[i].BlogPostID
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(blogpost.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "blog_post_id" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}
func (bptq *BlogPostTranslationQuery) loadLanguage(ctx context.Context, query *LanguageQuery, nodes []*BlogPostTranslation, init func(*BlogPostTranslation), assign func(*BlogPostTranslation, *Language)) error {
	ids := make([]string, 0, len(nodes))
	nodeids := make(map[string][]*BlogPostTranslation)
	for i := range nodes {
		fk := nodes[i].LanguageCode
		if _, ok := nodeids[fk]; !ok {
			ids = append(ids, fk)
		}
		nodeids[fk] = append(nodeids[fk], nodes[i])
	}
	if len(ids) == 0 {
		return nil
	}
	query.Where(language.IDIn(ids...))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nodeids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected foreign-key "language_code" returned %v`, n.ID)
		}
		for i := range nodes {
			assign(nodes[i], n)
		}
	}
	return nil
}

func (bptq *BlogPostTranslationQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := bptq.querySpec()
	_spec.Node.Columns = bptq.ctx.Fields
	if len(bptq.ctx.Fields) > 0 {
		_spec.Unique = bptq.ctx.Unique != nil && *bptq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, bptq.driver, _spec)
}

func (bptq *BlogPostTranslationQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(blogposttranslation.Table, blogposttranslation.Columns, sqlgraph.NewFieldSpec(blogposttranslation.FieldID, field.TypeUUID))
	_spec.From = bptq.sql
	if unique := bptq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if bptq.path != nil {
		_spec.Unique = true
	}
	if fields := bptq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, blogposttranslation.FieldID)
		for i := range fields {
			if fields[i] != blogposttranslation.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
		if bptq.withBlogPost != nil {
			_spec.Node.AddColumnOnce(blogposttranslation.FieldBlogPostID)
		}
		if bptq.withLanguage != nil {
			_spec.Node.AddColumnOnce(blogposttranslation.FieldLanguageCode)
		}
	}
	if ps := bptq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := bptq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := bptq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := bptq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (bptq *BlogPostTranslationQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(bptq.driver.Dialect())
	t1 := builder.Table(blogposttranslation.Table)
	columns := bptq.ctx.Fields
	if len(columns) == 0 {
		columns = blogposttranslation.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if bptq.sql != nil {
		selector = bptq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if bptq.ctx.Unique != nil && *bptq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range bptq.predicates {
		p(selector)
	}
	for _, p := range bptq.order {
		p(selector)
	}
	if offset := bptq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := bptq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// BlogPostTranslationGroupBy is the group-by builder for BlogPostTranslation entities.
type BlogPostTranslationGroupBy struct {
	selector
	build *BlogPostTranslationQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (bptgb *BlogPostTranslationGroupBy) Aggregate(fns ...AggregateFunc) *BlogPostTranslationGroupBy {
	bptgb.fns = append(bptgb.fns, fns...)
	return bptgb
}

// Scan applies the selector query and scans the result into the given value.
func (bptgb *BlogPostTranslationGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, bptgb.build.ctx, ent.OpQueryGroupBy)
	if err := bptgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*BlogPostTranslationQuery, *BlogPostTranslationGroupBy](ctx, bptgb.build, bptgb, bptgb.build.inters, v)
}

func (bptgb *BlogPostTranslationGroupBy) sqlScan(ctx context.Context, root *BlogPostTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(bptgb.fns))
	for _, fn := range bptgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*bptgb.flds)+len(bptgb.fns))
		for _, f := range *bptgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*bptgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := bptgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// BlogPostTranslationSelect is the builder for selecting fields of BlogPostTranslation entities.
type BlogPostTranslationSelect struct {
	*BlogPostTranslationQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (bpts *BlogPostTranslationSelect) Aggregate(fns ...AggregateFunc) *BlogPostTranslationSelect {
	bpts.fns = append(bpts.fns, fns...)
	return bpts
}

// Scan applies the selector query and scans the result into the given value.
func (bpts *BlogPostTranslationSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, bpts.ctx, ent.OpQuerySelect)
	if err := bpts.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*BlogPostTranslationQuery, *BlogPostTranslationSelect](ctx, bpts.BlogPostTranslationQuery, bpts, bpts.inters, v)
}

func (bpts *BlogPostTranslationSelect) sqlScan(ctx context.Context, root *BlogPostTranslationQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(bpts.fns))
	for _, fn := range bpts.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*bpts.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := bpts.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

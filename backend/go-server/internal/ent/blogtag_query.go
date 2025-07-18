// Code generated by ent, DO NOT EDIT.

package ent

import (
	"context"
	"database/sql/driver"
	"fmt"
	"math"
	"silan-backend/internal/ent/blogpost"
	"silan-backend/internal/ent/blogposttag"
	"silan-backend/internal/ent/blogtag"
	"silan-backend/internal/ent/predicate"

	"entgo.io/ent"
	"entgo.io/ent/dialect/sql"
	"entgo.io/ent/dialect/sql/sqlgraph"
	"entgo.io/ent/schema/field"
	"github.com/google/uuid"
)

// BlogTagQuery is the builder for querying BlogTag entities.
type BlogTagQuery struct {
	config
	ctx              *QueryContext
	order            []blogtag.OrderOption
	inters           []Interceptor
	predicates       []predicate.BlogTag
	withBlogPosts    *BlogPostQuery
	withBlogPostTags *BlogPostTagQuery
	// intermediate query (i.e. traversal path).
	sql  *sql.Selector
	path func(context.Context) (*sql.Selector, error)
}

// Where adds a new predicate for the BlogTagQuery builder.
func (btq *BlogTagQuery) Where(ps ...predicate.BlogTag) *BlogTagQuery {
	btq.predicates = append(btq.predicates, ps...)
	return btq
}

// Limit the number of records to be returned by this query.
func (btq *BlogTagQuery) Limit(limit int) *BlogTagQuery {
	btq.ctx.Limit = &limit
	return btq
}

// Offset to start from.
func (btq *BlogTagQuery) Offset(offset int) *BlogTagQuery {
	btq.ctx.Offset = &offset
	return btq
}

// Unique configures the query builder to filter duplicate records on query.
// By default, unique is set to true, and can be disabled using this method.
func (btq *BlogTagQuery) Unique(unique bool) *BlogTagQuery {
	btq.ctx.Unique = &unique
	return btq
}

// Order specifies how the records should be ordered.
func (btq *BlogTagQuery) Order(o ...blogtag.OrderOption) *BlogTagQuery {
	btq.order = append(btq.order, o...)
	return btq
}

// QueryBlogPosts chains the current query on the "blog_posts" edge.
func (btq *BlogTagQuery) QueryBlogPosts() *BlogPostQuery {
	query := (&BlogPostClient{config: btq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := btq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := btq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(blogtag.Table, blogtag.FieldID, selector),
			sqlgraph.To(blogpost.Table, blogpost.FieldID),
			sqlgraph.Edge(sqlgraph.M2M, true, blogtag.BlogPostsTable, blogtag.BlogPostsPrimaryKey...),
		)
		fromU = sqlgraph.SetNeighbors(btq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// QueryBlogPostTags chains the current query on the "blog_post_tags" edge.
func (btq *BlogTagQuery) QueryBlogPostTags() *BlogPostTagQuery {
	query := (&BlogPostTagClient{config: btq.config}).Query()
	query.path = func(ctx context.Context) (fromU *sql.Selector, err error) {
		if err := btq.prepareQuery(ctx); err != nil {
			return nil, err
		}
		selector := btq.sqlQuery(ctx)
		if err := selector.Err(); err != nil {
			return nil, err
		}
		step := sqlgraph.NewStep(
			sqlgraph.From(blogtag.Table, blogtag.FieldID, selector),
			sqlgraph.To(blogposttag.Table, blogposttag.BlogTagColumn),
			sqlgraph.Edge(sqlgraph.O2M, true, blogtag.BlogPostTagsTable, blogtag.BlogPostTagsColumn),
		)
		fromU = sqlgraph.SetNeighbors(btq.driver.Dialect(), step)
		return fromU, nil
	}
	return query
}

// First returns the first BlogTag entity from the query.
// Returns a *NotFoundError when no BlogTag was found.
func (btq *BlogTagQuery) First(ctx context.Context) (*BlogTag, error) {
	nodes, err := btq.Limit(1).All(setContextOp(ctx, btq.ctx, ent.OpQueryFirst))
	if err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nil, &NotFoundError{blogtag.Label}
	}
	return nodes[0], nil
}

// FirstX is like First, but panics if an error occurs.
func (btq *BlogTagQuery) FirstX(ctx context.Context) *BlogTag {
	node, err := btq.First(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return node
}

// FirstID returns the first BlogTag ID from the query.
// Returns a *NotFoundError when no BlogTag ID was found.
func (btq *BlogTagQuery) FirstID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = btq.Limit(1).IDs(setContextOp(ctx, btq.ctx, ent.OpQueryFirstID)); err != nil {
		return
	}
	if len(ids) == 0 {
		err = &NotFoundError{blogtag.Label}
		return
	}
	return ids[0], nil
}

// FirstIDX is like FirstID, but panics if an error occurs.
func (btq *BlogTagQuery) FirstIDX(ctx context.Context) uuid.UUID {
	id, err := btq.FirstID(ctx)
	if err != nil && !IsNotFound(err) {
		panic(err)
	}
	return id
}

// Only returns a single BlogTag entity found by the query, ensuring it only returns one.
// Returns a *NotSingularError when more than one BlogTag entity is found.
// Returns a *NotFoundError when no BlogTag entities are found.
func (btq *BlogTagQuery) Only(ctx context.Context) (*BlogTag, error) {
	nodes, err := btq.Limit(2).All(setContextOp(ctx, btq.ctx, ent.OpQueryOnly))
	if err != nil {
		return nil, err
	}
	switch len(nodes) {
	case 1:
		return nodes[0], nil
	case 0:
		return nil, &NotFoundError{blogtag.Label}
	default:
		return nil, &NotSingularError{blogtag.Label}
	}
}

// OnlyX is like Only, but panics if an error occurs.
func (btq *BlogTagQuery) OnlyX(ctx context.Context) *BlogTag {
	node, err := btq.Only(ctx)
	if err != nil {
		panic(err)
	}
	return node
}

// OnlyID is like Only, but returns the only BlogTag ID in the query.
// Returns a *NotSingularError when more than one BlogTag ID is found.
// Returns a *NotFoundError when no entities are found.
func (btq *BlogTagQuery) OnlyID(ctx context.Context) (id uuid.UUID, err error) {
	var ids []uuid.UUID
	if ids, err = btq.Limit(2).IDs(setContextOp(ctx, btq.ctx, ent.OpQueryOnlyID)); err != nil {
		return
	}
	switch len(ids) {
	case 1:
		id = ids[0]
	case 0:
		err = &NotFoundError{blogtag.Label}
	default:
		err = &NotSingularError{blogtag.Label}
	}
	return
}

// OnlyIDX is like OnlyID, but panics if an error occurs.
func (btq *BlogTagQuery) OnlyIDX(ctx context.Context) uuid.UUID {
	id, err := btq.OnlyID(ctx)
	if err != nil {
		panic(err)
	}
	return id
}

// All executes the query and returns a list of BlogTags.
func (btq *BlogTagQuery) All(ctx context.Context) ([]*BlogTag, error) {
	ctx = setContextOp(ctx, btq.ctx, ent.OpQueryAll)
	if err := btq.prepareQuery(ctx); err != nil {
		return nil, err
	}
	qr := querierAll[[]*BlogTag, *BlogTagQuery]()
	return withInterceptors[[]*BlogTag](ctx, btq, qr, btq.inters)
}

// AllX is like All, but panics if an error occurs.
func (btq *BlogTagQuery) AllX(ctx context.Context) []*BlogTag {
	nodes, err := btq.All(ctx)
	if err != nil {
		panic(err)
	}
	return nodes
}

// IDs executes the query and returns a list of BlogTag IDs.
func (btq *BlogTagQuery) IDs(ctx context.Context) (ids []uuid.UUID, err error) {
	if btq.ctx.Unique == nil && btq.path != nil {
		btq.Unique(true)
	}
	ctx = setContextOp(ctx, btq.ctx, ent.OpQueryIDs)
	if err = btq.Select(blogtag.FieldID).Scan(ctx, &ids); err != nil {
		return nil, err
	}
	return ids, nil
}

// IDsX is like IDs, but panics if an error occurs.
func (btq *BlogTagQuery) IDsX(ctx context.Context) []uuid.UUID {
	ids, err := btq.IDs(ctx)
	if err != nil {
		panic(err)
	}
	return ids
}

// Count returns the count of the given query.
func (btq *BlogTagQuery) Count(ctx context.Context) (int, error) {
	ctx = setContextOp(ctx, btq.ctx, ent.OpQueryCount)
	if err := btq.prepareQuery(ctx); err != nil {
		return 0, err
	}
	return withInterceptors[int](ctx, btq, querierCount[*BlogTagQuery](), btq.inters)
}

// CountX is like Count, but panics if an error occurs.
func (btq *BlogTagQuery) CountX(ctx context.Context) int {
	count, err := btq.Count(ctx)
	if err != nil {
		panic(err)
	}
	return count
}

// Exist returns true if the query has elements in the graph.
func (btq *BlogTagQuery) Exist(ctx context.Context) (bool, error) {
	ctx = setContextOp(ctx, btq.ctx, ent.OpQueryExist)
	switch _, err := btq.FirstID(ctx); {
	case IsNotFound(err):
		return false, nil
	case err != nil:
		return false, fmt.Errorf("ent: check existence: %w", err)
	default:
		return true, nil
	}
}

// ExistX is like Exist, but panics if an error occurs.
func (btq *BlogTagQuery) ExistX(ctx context.Context) bool {
	exist, err := btq.Exist(ctx)
	if err != nil {
		panic(err)
	}
	return exist
}

// Clone returns a duplicate of the BlogTagQuery builder, including all associated steps. It can be
// used to prepare common query builders and use them differently after the clone is made.
func (btq *BlogTagQuery) Clone() *BlogTagQuery {
	if btq == nil {
		return nil
	}
	return &BlogTagQuery{
		config:           btq.config,
		ctx:              btq.ctx.Clone(),
		order:            append([]blogtag.OrderOption{}, btq.order...),
		inters:           append([]Interceptor{}, btq.inters...),
		predicates:       append([]predicate.BlogTag{}, btq.predicates...),
		withBlogPosts:    btq.withBlogPosts.Clone(),
		withBlogPostTags: btq.withBlogPostTags.Clone(),
		// clone intermediate query.
		sql:  btq.sql.Clone(),
		path: btq.path,
	}
}

// WithBlogPosts tells the query-builder to eager-load the nodes that are connected to
// the "blog_posts" edge. The optional arguments are used to configure the query builder of the edge.
func (btq *BlogTagQuery) WithBlogPosts(opts ...func(*BlogPostQuery)) *BlogTagQuery {
	query := (&BlogPostClient{config: btq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	btq.withBlogPosts = query
	return btq
}

// WithBlogPostTags tells the query-builder to eager-load the nodes that are connected to
// the "blog_post_tags" edge. The optional arguments are used to configure the query builder of the edge.
func (btq *BlogTagQuery) WithBlogPostTags(opts ...func(*BlogPostTagQuery)) *BlogTagQuery {
	query := (&BlogPostTagClient{config: btq.config}).Query()
	for _, opt := range opts {
		opt(query)
	}
	btq.withBlogPostTags = query
	return btq
}

// GroupBy is used to group vertices by one or more fields/columns.
// It is often used with aggregate functions, like: count, max, mean, min, sum.
//
// Example:
//
//	var v []struct {
//		Name string `json:"name,omitempty"`
//		Count int `json:"count,omitempty"`
//	}
//
//	client.BlogTag.Query().
//		GroupBy(blogtag.FieldName).
//		Aggregate(ent.Count()).
//		Scan(ctx, &v)
func (btq *BlogTagQuery) GroupBy(field string, fields ...string) *BlogTagGroupBy {
	btq.ctx.Fields = append([]string{field}, fields...)
	grbuild := &BlogTagGroupBy{build: btq}
	grbuild.flds = &btq.ctx.Fields
	grbuild.label = blogtag.Label
	grbuild.scan = grbuild.Scan
	return grbuild
}

// Select allows the selection one or more fields/columns for the given query,
// instead of selecting all fields in the entity.
//
// Example:
//
//	var v []struct {
//		Name string `json:"name,omitempty"`
//	}
//
//	client.BlogTag.Query().
//		Select(blogtag.FieldName).
//		Scan(ctx, &v)
func (btq *BlogTagQuery) Select(fields ...string) *BlogTagSelect {
	btq.ctx.Fields = append(btq.ctx.Fields, fields...)
	sbuild := &BlogTagSelect{BlogTagQuery: btq}
	sbuild.label = blogtag.Label
	sbuild.flds, sbuild.scan = &btq.ctx.Fields, sbuild.Scan
	return sbuild
}

// Aggregate returns a BlogTagSelect configured with the given aggregations.
func (btq *BlogTagQuery) Aggregate(fns ...AggregateFunc) *BlogTagSelect {
	return btq.Select().Aggregate(fns...)
}

func (btq *BlogTagQuery) prepareQuery(ctx context.Context) error {
	for _, inter := range btq.inters {
		if inter == nil {
			return fmt.Errorf("ent: uninitialized interceptor (forgotten import ent/runtime?)")
		}
		if trv, ok := inter.(Traverser); ok {
			if err := trv.Traverse(ctx, btq); err != nil {
				return err
			}
		}
	}
	for _, f := range btq.ctx.Fields {
		if !blogtag.ValidColumn(f) {
			return &ValidationError{Name: f, err: fmt.Errorf("ent: invalid field %q for query", f)}
		}
	}
	if btq.path != nil {
		prev, err := btq.path(ctx)
		if err != nil {
			return err
		}
		btq.sql = prev
	}
	return nil
}

func (btq *BlogTagQuery) sqlAll(ctx context.Context, hooks ...queryHook) ([]*BlogTag, error) {
	var (
		nodes       = []*BlogTag{}
		_spec       = btq.querySpec()
		loadedTypes = [2]bool{
			btq.withBlogPosts != nil,
			btq.withBlogPostTags != nil,
		}
	)
	_spec.ScanValues = func(columns []string) ([]any, error) {
		return (*BlogTag).scanValues(nil, columns)
	}
	_spec.Assign = func(columns []string, values []any) error {
		node := &BlogTag{config: btq.config}
		nodes = append(nodes, node)
		node.Edges.loadedTypes = loadedTypes
		return node.assignValues(columns, values)
	}
	for i := range hooks {
		hooks[i](ctx, _spec)
	}
	if err := sqlgraph.QueryNodes(ctx, btq.driver, _spec); err != nil {
		return nil, err
	}
	if len(nodes) == 0 {
		return nodes, nil
	}
	if query := btq.withBlogPosts; query != nil {
		if err := btq.loadBlogPosts(ctx, query, nodes,
			func(n *BlogTag) { n.Edges.BlogPosts = []*BlogPost{} },
			func(n *BlogTag, e *BlogPost) { n.Edges.BlogPosts = append(n.Edges.BlogPosts, e) }); err != nil {
			return nil, err
		}
	}
	if query := btq.withBlogPostTags; query != nil {
		if err := btq.loadBlogPostTags(ctx, query, nodes,
			func(n *BlogTag) { n.Edges.BlogPostTags = []*BlogPostTag{} },
			func(n *BlogTag, e *BlogPostTag) { n.Edges.BlogPostTags = append(n.Edges.BlogPostTags, e) }); err != nil {
			return nil, err
		}
	}
	return nodes, nil
}

func (btq *BlogTagQuery) loadBlogPosts(ctx context.Context, query *BlogPostQuery, nodes []*BlogTag, init func(*BlogTag), assign func(*BlogTag, *BlogPost)) error {
	edgeIDs := make([]driver.Value, len(nodes))
	byID := make(map[uuid.UUID]*BlogTag)
	nids := make(map[uuid.UUID]map[*BlogTag]struct{})
	for i, node := range nodes {
		edgeIDs[i] = node.ID
		byID[node.ID] = node
		if init != nil {
			init(node)
		}
	}
	query.Where(func(s *sql.Selector) {
		joinT := sql.Table(blogtag.BlogPostsTable)
		s.Join(joinT).On(s.C(blogpost.FieldID), joinT.C(blogtag.BlogPostsPrimaryKey[0]))
		s.Where(sql.InValues(joinT.C(blogtag.BlogPostsPrimaryKey[1]), edgeIDs...))
		columns := s.SelectedColumns()
		s.Select(joinT.C(blogtag.BlogPostsPrimaryKey[1]))
		s.AppendSelect(columns...)
		s.SetDistinct(false)
	})
	if err := query.prepareQuery(ctx); err != nil {
		return err
	}
	qr := QuerierFunc(func(ctx context.Context, q Query) (Value, error) {
		return query.sqlAll(ctx, func(_ context.Context, spec *sqlgraph.QuerySpec) {
			assign := spec.Assign
			values := spec.ScanValues
			spec.ScanValues = func(columns []string) ([]any, error) {
				values, err := values(columns[1:])
				if err != nil {
					return nil, err
				}
				return append([]any{new(uuid.UUID)}, values...), nil
			}
			spec.Assign = func(columns []string, values []any) error {
				outValue := *values[0].(*uuid.UUID)
				inValue := *values[1].(*uuid.UUID)
				if nids[inValue] == nil {
					nids[inValue] = map[*BlogTag]struct{}{byID[outValue]: {}}
					return assign(columns[1:], values[1:])
				}
				nids[inValue][byID[outValue]] = struct{}{}
				return nil
			}
		})
	})
	neighbors, err := withInterceptors[[]*BlogPost](ctx, query, qr, query.inters)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		nodes, ok := nids[n.ID]
		if !ok {
			return fmt.Errorf(`unexpected "blog_posts" node returned %v`, n.ID)
		}
		for kn := range nodes {
			assign(kn, n)
		}
	}
	return nil
}
func (btq *BlogTagQuery) loadBlogPostTags(ctx context.Context, query *BlogPostTagQuery, nodes []*BlogTag, init func(*BlogTag), assign func(*BlogTag, *BlogPostTag)) error {
	fks := make([]driver.Value, 0, len(nodes))
	nodeids := make(map[uuid.UUID]*BlogTag)
	for i := range nodes {
		fks = append(fks, nodes[i].ID)
		nodeids[nodes[i].ID] = nodes[i]
		if init != nil {
			init(nodes[i])
		}
	}
	if len(query.ctx.Fields) > 0 {
		query.ctx.AppendFieldOnce(blogposttag.FieldBlogTagID)
	}
	query.Where(predicate.BlogPostTag(func(s *sql.Selector) {
		s.Where(sql.InValues(s.C(blogtag.BlogPostTagsColumn), fks...))
	}))
	neighbors, err := query.All(ctx)
	if err != nil {
		return err
	}
	for _, n := range neighbors {
		fk := n.BlogTagID
		node, ok := nodeids[fk]
		if !ok {
			return fmt.Errorf(`unexpected referenced foreign-key "blog_tag_id" returned %v for node %v`, fk, n)
		}
		assign(node, n)
	}
	return nil
}

func (btq *BlogTagQuery) sqlCount(ctx context.Context) (int, error) {
	_spec := btq.querySpec()
	_spec.Node.Columns = btq.ctx.Fields
	if len(btq.ctx.Fields) > 0 {
		_spec.Unique = btq.ctx.Unique != nil && *btq.ctx.Unique
	}
	return sqlgraph.CountNodes(ctx, btq.driver, _spec)
}

func (btq *BlogTagQuery) querySpec() *sqlgraph.QuerySpec {
	_spec := sqlgraph.NewQuerySpec(blogtag.Table, blogtag.Columns, sqlgraph.NewFieldSpec(blogtag.FieldID, field.TypeUUID))
	_spec.From = btq.sql
	if unique := btq.ctx.Unique; unique != nil {
		_spec.Unique = *unique
	} else if btq.path != nil {
		_spec.Unique = true
	}
	if fields := btq.ctx.Fields; len(fields) > 0 {
		_spec.Node.Columns = make([]string, 0, len(fields))
		_spec.Node.Columns = append(_spec.Node.Columns, blogtag.FieldID)
		for i := range fields {
			if fields[i] != blogtag.FieldID {
				_spec.Node.Columns = append(_spec.Node.Columns, fields[i])
			}
		}
	}
	if ps := btq.predicates; len(ps) > 0 {
		_spec.Predicate = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	if limit := btq.ctx.Limit; limit != nil {
		_spec.Limit = *limit
	}
	if offset := btq.ctx.Offset; offset != nil {
		_spec.Offset = *offset
	}
	if ps := btq.order; len(ps) > 0 {
		_spec.Order = func(selector *sql.Selector) {
			for i := range ps {
				ps[i](selector)
			}
		}
	}
	return _spec
}

func (btq *BlogTagQuery) sqlQuery(ctx context.Context) *sql.Selector {
	builder := sql.Dialect(btq.driver.Dialect())
	t1 := builder.Table(blogtag.Table)
	columns := btq.ctx.Fields
	if len(columns) == 0 {
		columns = blogtag.Columns
	}
	selector := builder.Select(t1.Columns(columns...)...).From(t1)
	if btq.sql != nil {
		selector = btq.sql
		selector.Select(selector.Columns(columns...)...)
	}
	if btq.ctx.Unique != nil && *btq.ctx.Unique {
		selector.Distinct()
	}
	for _, p := range btq.predicates {
		p(selector)
	}
	for _, p := range btq.order {
		p(selector)
	}
	if offset := btq.ctx.Offset; offset != nil {
		// limit is mandatory for offset clause. We start
		// with default value, and override it below if needed.
		selector.Offset(*offset).Limit(math.MaxInt32)
	}
	if limit := btq.ctx.Limit; limit != nil {
		selector.Limit(*limit)
	}
	return selector
}

// BlogTagGroupBy is the group-by builder for BlogTag entities.
type BlogTagGroupBy struct {
	selector
	build *BlogTagQuery
}

// Aggregate adds the given aggregation functions to the group-by query.
func (btgb *BlogTagGroupBy) Aggregate(fns ...AggregateFunc) *BlogTagGroupBy {
	btgb.fns = append(btgb.fns, fns...)
	return btgb
}

// Scan applies the selector query and scans the result into the given value.
func (btgb *BlogTagGroupBy) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, btgb.build.ctx, ent.OpQueryGroupBy)
	if err := btgb.build.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*BlogTagQuery, *BlogTagGroupBy](ctx, btgb.build, btgb, btgb.build.inters, v)
}

func (btgb *BlogTagGroupBy) sqlScan(ctx context.Context, root *BlogTagQuery, v any) error {
	selector := root.sqlQuery(ctx).Select()
	aggregation := make([]string, 0, len(btgb.fns))
	for _, fn := range btgb.fns {
		aggregation = append(aggregation, fn(selector))
	}
	if len(selector.SelectedColumns()) == 0 {
		columns := make([]string, 0, len(*btgb.flds)+len(btgb.fns))
		for _, f := range *btgb.flds {
			columns = append(columns, selector.C(f))
		}
		columns = append(columns, aggregation...)
		selector.Select(columns...)
	}
	selector.GroupBy(selector.Columns(*btgb.flds...)...)
	if err := selector.Err(); err != nil {
		return err
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := btgb.build.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

// BlogTagSelect is the builder for selecting fields of BlogTag entities.
type BlogTagSelect struct {
	*BlogTagQuery
	selector
}

// Aggregate adds the given aggregation functions to the selector query.
func (bts *BlogTagSelect) Aggregate(fns ...AggregateFunc) *BlogTagSelect {
	bts.fns = append(bts.fns, fns...)
	return bts
}

// Scan applies the selector query and scans the result into the given value.
func (bts *BlogTagSelect) Scan(ctx context.Context, v any) error {
	ctx = setContextOp(ctx, bts.ctx, ent.OpQuerySelect)
	if err := bts.prepareQuery(ctx); err != nil {
		return err
	}
	return scanWithInterceptors[*BlogTagQuery, *BlogTagSelect](ctx, bts.BlogTagQuery, bts, bts.inters, v)
}

func (bts *BlogTagSelect) sqlScan(ctx context.Context, root *BlogTagQuery, v any) error {
	selector := root.sqlQuery(ctx)
	aggregation := make([]string, 0, len(bts.fns))
	for _, fn := range bts.fns {
		aggregation = append(aggregation, fn(selector))
	}
	switch n := len(*bts.selector.flds); {
	case n == 0 && len(aggregation) > 0:
		selector.Select(aggregation...)
	case n != 0 && len(aggregation) > 0:
		selector.AppendSelect(aggregation...)
	}
	rows := &sql.Rows{}
	query, args := selector.Query()
	if err := bts.driver.Query(ctx, query, args, rows); err != nil {
		return err
	}
	defer rows.Close()
	return sql.ScanSlice(rows, v)
}

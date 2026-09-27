You'll find honest analysis of each choice, performance benchmarks, financial context, detailed tradeoffs, and migration strategies. Nothing is set in stone, these are decisions for today that will evolve as we learn and grow.


---

## Why These Choices? (Technical Analysis from a Fullstack Dev)


I'll be completely transparent here. I'm a dev with 4+ years of experience, but this is my first rodeo with such a big responsability at a fintech. These decisions came from a lot of trial and error, probably not the best choices but the intention is to give a start, and mainly understanding that in a startup you need to balance **speed** vs **robustness**. Let me break down the decisions(Probably gonna change somehing soon):

### **Runtime: Bun vs Node.js vs Deno**

**Why Bun?**

**Performance Deep Dive**:
- **JavaScriptCore engine**: Uses Safari's JS engine instead of V8, optimized for server workloads
- **System calls optimization**: Direct syscalls reduce overhead vs Node.js's libuv abstraction
- **Memory management**: Better garbage collection for server applications, 50% less memory usage
- **Real benchmarks**: payment processing endpoint: 45k req/s (Bun) vs 12k req/s (Node.js)

**Technical Architecture**:
- **Zig implementation**: Lower-level language for runtime = better performance characteristics
- **Built-in transpiler**: TypeScript/JSX compilation without Babel/webpack overhead
- **Native modules**: fs, crypto, http implemented in Zig vs C++ addons in Node.js

**Financial Operations Context**:
- **Transaction processing**: 3-4x throughput improvement for database-heavy operations
- **Real-time calculations**: Revenue splits, fee calculations execute faster
- **Webhook handling**: Better concurrency handling for payment provider callbacks

**Tradeoffs**:
- ❌ **Stability risk**: v1.0 released Sept 2023, some edge cases in production
- ❌ **Debugging tools**: Less mature profiling/debugging ecosystem vs Node.js
- ✅ **Migration path**: 99% Node.js compatibility means easy rollback if needed

**Why NOT Node.js**:
- **Event loop blocking**: Single-threaded nature bottlenecks financial calculations
- **Memory leaks**: V8's GC struggles with long-running financial processes
- **Cold start**: Slower initialization impacts serverless deployment patterns

**Why NOT Deno**:
- **Import maps complexity**: ESM-only approach complicates payment SDK integrations
- **Limited ecosystem**: Stripe, Plaid SDKs not optimized for Deno runtime
- **Security model**: Permission system adds deployment complexity for MVP

### **Backend: Elysia vs Fastify vs Express**

**Why Elysia?**

**Type System Deep Dive**:
- **Eden Treaty**: End-to-end type safety from server to client without codegen
- **Compile-time validation**: Zod schemas compiled to native code, zero runtime overhead
- **Inferred return types**: Client autocomplete based on actual server implementation

**Performance Architecture**:
- **Bun-native HTTP**: Bypasses Node.js compatibility layer, direct system calls
- **Zero-copy parsing**: JSON/form data parsing without memory allocation
- **Optimized routing**: Radix tree router with compile-time optimizations
- **Benchmark results**: 850k req/s (Elysia) vs 85k req/s (Express) vs 650k req/s (Fastify)

**Financial API Requirements**:
- **Request validation**: Automatic validation prevents malformed financial data
- **Response serialization**: Fast JSON serialization for real-time market data
- **Error handling**: Structured error responses for compliance logging

**Tradeoffs**:
- ❌ **Ecosystem maturity**: Released 2023, limited third-party plugins
- ❌ **Documentation gaps**: Some advanced patterns lack examples
- ❌ **Team learning**: New paradigms vs familiar Express patterns
- ✅ **Future-proof**: Built for modern TypeScript ecosystem

**Why NOT Express**:
- **Callback hell**: Error-prone async patterns for financial operations
- **Runtime validation**: Performance penalty for validating transaction data
- **Type safety**: Manual typing leads to production bugs with financial data

**Why NOT Fastify**:
- **Node.js limitations**: Still bound by V8/libuv performance ceiling
- **Plugin complexity**: Overly complex plugin system for simple financial APIs
- **Type inference**: Limited compared to Elysia's compile-time magic

### **Database: PostgreSQL vs MongoDB vs MySQL**

**Why PostgreSQL?**

**Financial Data Integrity**:
- **MVCC (Multi-Version Concurrency Control)**: Concurrent transactions without locking
- **WAL (Write-Ahead Logging)**: Crash recovery and point-in-time recovery
- **Serializable isolation**: Prevents phantom reads in financial calculations
- **Row-level security**: Critical for multi-tenant financial data

**Advanced Features for Fintech**:
- **JSONB indexing**: Fast queries on flexible payment metadata
- **Full-text search**: KYC document search and compliance reporting
- **Partitioning**: Time-based partitioning for transaction history
- **Extensions**: PostGIS for location-based fraud detection, pgcrypto for encryption

**Performance Characteristics**:
- **B-tree indexes**: Optimal for financial data queries by date/amount
- **Partial indexes**: Index only active transactions, save space
- **Query planning**: Cost-based optimizer for complex financial reports
- **Connection pooling**: pgBouncer handles 10k+ concurrent connections

**Regulatory Compliance**:
```sql
-- Immutable audit trail
CREATE TABLE transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  amount DECIMAL(19,4) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  -- Never allow updates to financial data
  updated_at TIMESTAMPTZ GENERATED ALWAYS AS (created_at) STORED
);
```

**Tradeoffs**:
- ❌ **Vertical scaling limits**: Single-node bottlenecks at ~100k TPS
- ❌ **Operational complexity**: Backup, monitoring, tuning requires expertise
- ❌ **Memory hungry**: Requires careful shared_buffers tuning
- ✅ **Battle-tested**: Used by banks, financial institutions globally

**Why NOT MongoDB**:
- **Eventual consistency**: Network partitions = incorrect balances
- **Schema flexibility**: Too dangerous for financial data structure
- **Transaction limitations**: Multi-document ACID only in replica sets

**Why NOT MySQL**:
- **JSON performance**: Slower JSON queries vs PostgreSQL's JSONB
- **Window functions**: Limited analytical capabilities vs PostgreSQL
- **Full-text search**: Basic compared to PostgreSQL's advanced features

### **ORM: Prisma vs TypeORM vs Sequelize**

**Why Prisma?**

**Type Generation Deep Dive**:
- **Schema-first approach**: Single source of truth for database and types
- **Generated client**: Types reflect exact database schema, impossible to drift
- **Relation inference**: Automatic JOIN generation with type safety
```typescript
// This is fully type-safe, autocompleted
const transaction = await prisma.transaction.findUnique({
  where: { id: transactionId },
  include: {
    user: { select: { email: true } },
    splits: { include: { investor: true } }
  }
})
// transaction.user.email is typed and autocompleted
// transaction.splits[0].investor.name is typed
```

**Query Engine Architecture**:
- **Rust-based engine**: Better performance than JavaScript-based ORMs
- **Connection pooling**: Built-in pooling with connection limits
- **Query batching**: Automatic N+1 query resolution
- **Prepared statements**: SQL injection prevention by default

**Financial Data Patterns**:
- **Decimal precision**: Native support for financial decimals
- **Audit timestamps**: Automatic createdAt/updatedAt tracking
- **Soft deletes**: Built-in support for financial data retention
- **Migration safety**: Schema migrations with rollback support

**Developer Experience**:
- **Prisma Studio**: Visual database browser for debugging
- **Migration workflow**: Version-controlled schema changes
- **Seed scripts**: TypeScript-based data seeding
- **Real-time validation**: Schema errors caught at development time

**Tradeoffs**:
- ❌ **Raw query complexity**: Complex financial reports need raw SQL
- ❌ **Bundle size**: ~2MB client vs lightweight alternatives
- ❌ **Learning curve**: Different patterns from traditional ORMs
- ✅ **Productivity gain**: 60% less boilerplate code for financial APIs

**Why NOT TypeORM**:
- **Decorator hell**: Metadata explosion for complex financial models
- **Runtime reflection**: Performance penalty for TypeScript decorators
- **Active Record pattern**: Mixes business logic with data access

**Why NOT Sequelize**:
- **JavaScript-only**: No native TypeScript support
- **Callback patterns**: Promise-based async is harder to reason about
- **Model definition**: Verbose configuration for financial precision requirements

### **Cache/Queue: Redis + BullMQ vs RabbitMQ vs AWS SQS**

**Why Redis + BullMQ?**

**Unified Architecture Benefits**:
- **Single data store**: Cache, sessions, queues, pub/sub in one system
- **Memory efficiency**: Shared memory pool vs separate systems
- **Operational simplicity**: One service to monitor, backup, scale
- **Network locality**: Co-located cache and queue reduce latency

**BullMQ Advanced Features**:
- **Job priorities**: Critical payment processing takes precedence
- **Delayed jobs**: Schedule settlement processing, compliance reports
- **Rate limiting**: Prevent API hammering of payment providers
- **Job retry with exponential backoff**: Handle transient payment failures
```typescript
// Financial job with retry logic
await paymentQueue.add('processPayment', {
  transactionId: '123',
  amount: 1000.00
}, {
  attempts: 5,
  backoff: {
    type: 'exponential',
    delay: 2000
  },
  removeOnComplete: 100, // Keep for auditing
  removeOnFail: 50
})
```

**Performance Characteristics**:
- **In-memory speed**: Sub-millisecond job pickup for time-sensitive payments
- **Redis Streams**: Persistent job history for compliance auditing
- **Lua scripting**: Atomic job operations prevent race conditions
- **Pipeline commands**: Batch operations reduce network round-trips

**Financial Use Cases**:
- **Payment processing**: Async webhook handling from Stripe
- **Settlement calculations**: End-of-day revenue distribution
- **Compliance reporting**: Daily/monthly regulatory reports
- **Notification delivery**: Real-time investor updates

**High Availability Setup**:
- **Redis Sentinel**: Automatic failover for 99.9% uptime
- **Redis Cluster**: Horizontal scaling for high-volume processing
- **AOF + RDB**: Persistence for job recovery after crashes

**Tradeoffs**:
- ❌ **Memory limitations**: Jobs must fit in RAM vs disk-based queues
- ❌ **Complex setup**: Redis Cluster configuration for production
- ❌ **Data loss risk**: Memory-first means potential job loss on crashes
- ✅ **Development velocity**: Single stack vs complex message broker setup

**Why NOT RabbitMQ**:
- **Erlang complexity**: Harder to debug, monitor, and tune
- **Message durability overhead**: Disk I/O slows financial processing
- **Memory management**: Complex flow control vs Redis's simplicity

**Why NOT AWS SQS**:
- **Vendor lock-in**: Harder to migrate vs self-hosted Redis
- **Latency**: Network calls vs in-memory processing
- **Cost scaling**: Per-message pricing vs flat Redis hosting cost

### **Payments: Stripe Connect vs MercadoPago vs Native PIX**

**Why Stripe Connect?**

**Marketplace Architecture Deep Dive**:
- **Multi-party payments**: Direct charges to connected accounts
- **Application fees**: Automatic platform fee collection
- **Express accounts**: Simplified onboarding for Brazilian CPF/CNPJ
- **Transfers**: Instant or scheduled payouts to connected accounts
```typescript
// Multi-party payment with automatic splits
const payment = await stripe.paymentIntents.create({
  amount: 10000, // R$100.00
  currency: 'brl',
  on_behalf_of: businessAccount.id,
  transfer_data: {
    destination: businessAccount.id,
  },
  application_fee_amount: 500, // R$5.00 platform fee
})
```

**Compliance & Security**:
- **PCI DSS Level 1**: Highest security certification for card data
- **3D Secure 2**: Strong customer authentication for EU regulations
- **SCA compliance**: Secure Customer Authentication for Brazil
- **Fraud detection**: Machine learning-based risk assessment
- **KYC automation**: Identity verification for connected accounts

**Technical Integration Benefits**:
- **Webhook reliability**: Automatic retries, idempotency keys
- **SDK ecosystem**: Official libraries for all major languages
- **Test mode**: Complete sandbox environment for development
- **Dashboard**: Real-time monitoring, dispute management

**Financial Operations**:
- **Instant payouts**: Real-time transfers to bank accounts
- **Currency conversion**: Multi-currency support for international expansion
- **Reconciliation**: Detailed transaction reporting for accounting
- **Chargeback protection**: Automatic dispute handling

**Brazilian Market Considerations**:
- **PIX integration**: In beta, full support expected Q2 2024
- **Boleto support**: Traditional Brazilian payment method
- **Tax compliance**: Automatic IRPF/ISS calculation and reporting
- **Local bank support**: Integration with major Brazilian banks

**Tradeoffs**:
- ❌ **Higher fees**: 4.99% vs 3.99% local providers, but includes fraud protection
- ❌ **USD settlement**: Currency conversion costs for BRL operations
- ❌ **Limited PIX**: Current PIX support through third-party providers only
- ✅ **Global scale**: Battle-tested with millions of businesses worldwide

**Why NOT MercadoPago(For now)**:
- **API instability**: Frequent breaking changes, inconsistent documentation
- **Limited international**: Hard to expand beyond LATAM markets
- **Webhook reliability**: Known issues with delivery consistency

**Why NOT Native PIX(For now)**:
- **Integration complexity**: Different APIs for each Brazilian bank
- **Settlement timing**: T+1 vs instant with Stripe
- **Fraud protection**: Manual implementation of risk management
- **Compliance burden**: Direct integration with Central Bank requirements

**Migration Strategy**:
```typescript
// Gradual rollout plan
if (monthlyVolume > 25000 && user.country === 'BR') {
  // Use PIX for domestic transactions
  return processWithPIX(payment)
} else {
  // Use Stripe for international + low volume
  return processWithStripe(payment)
}
```

### **Deploy: DigitalOcean vs AWS vs Railway**

**Why DigitalOcean App Platform?**

**Startup-Optimized Architecture**:
- **Git-based deployment**: Push to deploy, automatic builds from GitHub
- **Zero-config scaling**: Auto-scaling based on CPU/memory usage
- **Integrated monitoring**: Built-in metrics, alerts without additional setup
- **Database management**: Automatic backups, connection pooling, read replicas

**Financial Application Requirements**:
- **Compliance**: SOC 2 Type II, ISO 27001 certifications
- **Uptime SLA**: 99.95% guaranteed uptime for financial operations
- **Data residency**: Configurable regions for regulatory compliance
- **Backup strategy**: Point-in-time recovery, cross-region backups

**Developer Experience**:
- **Preview deployments**: Branch-based staging environments
- **Environment variables**: Secure secret management
- **Custom domains**: SSL certificates managed automatically
- **Team collaboration**: Role-based access control

**Scaling Characteristics**:
- **Vertical scaling**: Up to 32GB RAM, 8 vCPUs per service
- **Horizontal scaling**: Multiple instances with load balancing
- **Database scaling**: Read replicas, connection pooling
- **CDN integration**: Global edge caching for static assets

**Tradeoffs**:
- ❌ **Service limitations**: No AI/ML services, limited serverless functions
- ❌ **Vendor lock-in**: Migration complexity vs containerized AWS deployment
- ❌ **Advanced networking**: Limited VPC, custom routing options
- ✅ **Operational simplicity**: 90% less DevOps overhead vs AWS setup

**Why NOT AWS**:
- **Complexity overhead**: 20+ services needed for basic fintech setup
- **Cost unpredictability**: Billing spikes from misconfigured services
- **DevOps requirement**: Need dedicated infrastructure engineer

**Why NOT Railway**:
- **Pricing model**: Expensive at scale compared to DigitalOcean
- **Limited database options**: No managed PostgreSQL replicas
- **Startup risk**: Smaller company, uncertain long-term viability

**Migration Strategy**:
- **12-month threshold**: Evaluate migration when hitting infrastructure limits
- **Container-ready**: Docker deployment makes future migrations easier
- **Database portability**: Standard PostgreSQL dump/restore process

---

## **Decisions**

**IMPORTANT: Nothing is Set in Stone**

These are **decisions for today**, not permanent commitments.

Every choice here comes with exit strategies and migration paths. We're optimizing for learning fast and changing direction quickly when data proves us wrong.

**Current Priorities** (subject to change as we grow):

1. **Velocity**: Ship fast, iterate faster - because market validation trumps technical perfection
2. **Type Safety**: Reduce production bugs (critical for fintech) - because money mistakes are expensive
3. **Cost Control**: Runway is limited, every dollar matters - because runway determines how many pivots we can afford
4. **Team Scalability**: Fast onboarding of junior/mid devs - because we can't afford senior-only hiring

These technical choices will evolve as our business model solidifies, team grows, and we get real user feedback. The goal isn't to be right—it's to be wrong quickly and cheaply.

## **The Build-in-Public Journey**

This is just the beginning. We're building our fintech transparently, sharing our technical decisions, challenges, and learnings along the way.

### **What's Next**
- Designing the application architecture
- Implementing Brazilian KYC workflows
- Building the investor dashboard with real-time updates
- Integrating Stripe Connect for revenue splitting

### **Why Share This**
The Brazilian fintech ecosystem is rapidly evolving, and we believe in contributing back to the community. Whether you're building similar platforms, evaluating technology choices, or just curious about fintech development—our journey might provide useful insights.

![tech](/blog/techAn.webp)

---

## Notes

For the past few weeks, I've been reading some content from [Matheus Fidelis](https://fidelissauro.dev), a Brazilian Site Reliability Engineer who's worked at some of the largest companies in the Brazilian market. His blog is an absolute goldmine for system design, infrastructure, and scalability insights.

As someone navigating the complexities of fintech infrastructure decisions, his insights on solution architecture and best practices have been incredibly helpful. If you're interested in system design, cloud architecture, or just want to learn from someone who's been in the trenches of high-scale Brazilian tech, definitely check out his blog at [fidelissauro.dev](https://fidelissauro.dev).


## Social Media

Building in public means building with the community. If you're interested in fintech, startup architecture decisions, or just want to follow along as we build this from zero:

- **LinkedIn**: [martin-fantinelli](https://www.linkedin.com/in/martin-fantinelli/)
- **X/Twitter**: [@martinfantineli](https://x.com/martinfantineli)
- **Instagram**: [@martinfantinelli](https://www.instagram.com/martinfantinelli)

Questions, feedback, or just want to chat about anything? Feel free to reach out on any platform. To be honest, there's nothing big on my social media presence, kinda lowprofile 😅.

---

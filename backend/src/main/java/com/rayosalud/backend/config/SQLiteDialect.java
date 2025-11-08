package com.rayosalud.backend.config;

import org.hibernate.dialect.Dialect;
import org.hibernate.dialect.identity.IdentityColumnSupport;
import org.hibernate.dialect.pagination.LimitHandler;
import org.hibernate.dialect.pagination.AbstractLimitHandler;
import org.hibernate.dialect.DatabaseVersion;
import org.hibernate.id.insert.GetGeneratedKeysDelegate;
import org.hibernate.persister.entity.EntityPersister;

public class SQLiteDialect extends Dialect {

    public SQLiteDialect() {
        super(DatabaseVersion.make(3, 0));
    }

    @Override
    public boolean supportsCurrentTimestampSelection() {
        return true;
    }

    @Override
    public String getCurrentTimestampSelectString() {
        return "select current_timestamp";
    }

    @Override
    public boolean hasAlterTable() {
        return false;
    }

    @Override
    public boolean dropConstraints() {
        return false;
    }

    @Override
    public IdentityColumnSupport getIdentityColumnSupport() {
        return new IdentityColumnSupport() {
            @Override
            public boolean supportsIdentityColumns() {
                return true;
            }

            @Override
            public String getIdentityColumnString(int type) {
                return "integer";
            }

            @Override
            public String getIdentitySelectString(String table, String column, int type) {
                return "select last_insert_rowid()";
            }

            @Override
            public String getIdentityInsertString() {
                return null;
            }

            @Override
            public boolean supportsInsertSelectIdentity() {
                return false;
            }

            @Override
            public boolean hasDataTypeInIdentityColumn() {
                return true;
            }

            @Override
            public String appendIdentitySelectToInsert(String insertSQL) {
                return insertSQL;
            }

            @Override
            public GetGeneratedKeysDelegate buildGetGeneratedKeysDelegate(EntityPersister persister) {
                return new GetGeneratedKeysDelegate(persister, false, org.hibernate.generator.EventType.INSERT);
            }
        };
    }

    @Override
    public LimitHandler getLimitHandler() {
        return new AbstractLimitHandler() {
            @Override
            public String processSql(String sql, org.hibernate.query.spi.Limit limit) {
                return sql + (limit.getMaxRows() != null ? " limit " + limit.getMaxRows() : "")
                        + (limit.getFirstRow() != null ? " offset " + limit.getFirstRow() : "");
            }

            @Override
            public boolean supportsLimit() {
                return true;
            }

            @Override
            public boolean supportsLimitOffset() {
                return true;
            }
        };
    }

    @Override
    public boolean supportsUnionAll() {
        return true;
    }
}
/*

    Harvest-OpenMRS Table Exporter

    -- Description --
    Utility to snapshot the Postgres schema used by Harvest on the demo site
    and package it up as a standalone sqlite database

    -- Requires DataExpress 0.9.0.2

*/


import edu.chop.cbmi.dataExpress.dsl.ETL._
import edu.chop.cbmi.dataExpress.dsl.stores.SqlDb
import edu.chop.cbmi.dataExpress.dataModels.RichOption._
import edu.chop.cbmi.dataExpress.dataModels._
import edu.chop.cbmi.dataExpress.dataModels.sql._
import edu.chop.cbmi.dataExpress.backends._
import edu.chop.cbmi.dataExpress.dataWriters.sql._

//Set up the connections to the OpenMRS source schema and the Harvest demo db

val postgres:SqlBackend = SqlBackendFactory("harvestdb_postgres.properties")
val sqlite:SqlBackend = SqlBackendFactory("harvestdb_sqlite.properties")

postgres.connect
sqlite.connect

sqlite.execute("PRAGMA foreign_keys = ON")

//TODO: blow away entire database first

val tableQuery = """SELECT relname
                      FROM pg_stat_user_tables
                     WHERE schemaname='public'
                  ORDER BY relname"""

val tablenames = DataTable(postgres, tableQuery).map{r => r.relname.as[String].get}.toList


tablenames.foreach {table =>

    val query = """SELECT * from %s""".format(table)
    val sourceTable = DataTable(postgres, query)

    val writer = SqlTableWriter(sqlite)

    writer.insert_table(table, sourceTable.dataTypes, sourceTable, SqlTableWriter.OVERWRITE_OPTION_DROP)
}

sqlite commit


//TODO: truncate all tables that begin with auth_

sqlite close
postgres close

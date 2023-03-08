import {query} from '../config/db';
import Model from './Model';
import TABLES from './CONFIG_DB_INFO';


class ProductModel extends Model {
  constructor(tableName) {
    super(tableName);
  }

}

export default new ProductModel(TABLES.NOTES);
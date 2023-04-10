module.exports = (sequelize, DataTypes) => {
  const PostCategory = sequelize.define('PostCategory',
  {
    postId: { type: DataTypes.INTEGER, primaryKey: true },
    categoryId: { type: DataTypes.INTEGER, primaryKey: true },
  },
  {
    tableName: 'posts_categories',
    timestamps: false,
    underscored: true,
  });

  PostCategory.associate = ({ Category, BlogPost }) => {
    Category.belongsToMany(BlogPost,
      { 
        foreignKey: 'category_id', 
        otherKey: 'post_id',
        as: 'blogs',
        through: PostCategory,
      },
    );

    BlogPost.belongsToMany(Category,
      { 
        foreignKey: 'post_id', 
        otherKey: 'category_id',
        as: 'categories',
        through: PostCategory,
      }
    );
  }

  return PostCategory;
};
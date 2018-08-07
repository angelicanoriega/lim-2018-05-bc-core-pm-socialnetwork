describe('network', () => {
    it('debería exponer función writeUserData en objeto global', () => {
        assert.isFunction(writeUserData);
      });
    
      it('debería exponer función writeNewPost en objeto global', () => {
        assert.isFunction(writeNewPost);
      });
    
      it('debería exponer función returnData en objeto global', () => {
        assert.isFunction(returnData);
      });
    
      it('debería exponer función showData en objeto global', () => {
        assert.isFunction(showData);
      });
      it('debería exponer función returnDataPublic en objeto global', () => {
        assert.isFunction(returnDataPublic);
      });
      it('debería exponer función showWorld en objeto global', () => {
        assert.isFunction(showWorld);
      });
      describe('showData ( userId, keyPost,posts, likePost,dislikePost,nameUserId ) ', () => {
        it('debería retornar un objeto', () => {
            const data=showData ("userId",  "keyPost","posts", "likePost","dislikePost","nameUserId" );
            assert.equal(data.usersId,"userId");
          });
      });
    })
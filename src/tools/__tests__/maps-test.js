import expect from 'expect';

const thing = true;

describe('tests', ()=>{
  it('should run a test successfully', ()=>{
    expect(thing).toExist();
  });
});

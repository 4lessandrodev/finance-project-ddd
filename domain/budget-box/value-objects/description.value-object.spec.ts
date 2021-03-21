import { DescriptionValueObject } from './description.value-object';

describe('description.value-object', () => {
  it('should create a valid description value object', () => {
    const description = DescriptionValueObject.create('valid_description');
    expect(description.isSuccess).toBe(true);
  });

  it('should normalize description to lowercase', () => {
    const description = DescriptionValueObject.create('VaLiD_DesCriPtiOn');
    expect(description.isSuccess).toBe(true);
    expect(description.getResult().value).toBe('valid_description');
  });

  it('should fail if not provide description', () => {
    const description = DescriptionValueObject.create(' ');
    expect(description.isFailure).toBe(true);
    expect(description.error).toBe(
      'Invalid description lenght min 1 char and max 30 char',
    );
  });

  it('should fail if provide long description (greatter than 30 char)', () => {
    const description = DescriptionValueObject.create(
      'Invalid description lenght greatter than max 30 char',
    );
    expect(description.isFailure).toBe(true);
    expect(description.error).toBe(
      'Invalid description lenght min 1 char and max 30 char',
    );
  });
});

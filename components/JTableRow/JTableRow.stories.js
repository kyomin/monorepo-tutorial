import { storiesOf } from '@storybook/vue';
import JTableRow from './JTableRow.vue';

storiesOf('JTableRow', module)
  .add('normal', () => ({
    components: { JTableRow },
    template:
    `
      <JTableRow
        :values="values"
      />
    `,
    data: () => ({
      values: [
        'jake',
        'jake@email.com'
      ]
    })
  }))
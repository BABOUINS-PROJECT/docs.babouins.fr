import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Facile à utiliser',
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        Docusaurus a été conçu dès le départ pour être facilement installé et utilisé afin de rendre votre site Web rapidement opérationnel.
      </>
    ),
  },
  {
    title: 'Se concentrer sur l\'essentiel',
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
      Docusaurus vous permet de vous concentrer sur vos documents, et nous nous chargeons des tâches. Allez-y et déplacez vos documents dans le répertoire <code>docs</code>.
      </>
    ),
  },
  {
    title: 'Powered by React',
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        Étendez ou personnalisez la mise en page de votre site web en réutilisant React. Docusaurus peut être étendu tout en réutilisant le même en-tête et le même pied de page.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}

import jsdom from 'jsdom'

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16'

const { JSDOM } = jsdom;

const doc = new JSDOM('<!DOCTYPE html><html><body></body></html>')

Enzyme.configure({ adapter: new Adapter() })

global.document = doc
global.window   = doc.defaultView

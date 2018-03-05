import React, {Component} from 'react';
import './App.css';
import {
    Button, Card, CardImg, CardTitle,CardBody,
    Modal, ModalHeader, ModalBody, ModalFooter,
    Pagination, PaginationItem, PaginationLink
} from 'reactstrap';

class App extends Component {
    constructor() {
        super();
        this.state = {
            files: [],
            page:1,
            pages:1,
            addModal: false,
            previewModal: false,
            preview: {}
        }
    }
    async loadFiles(page = 1)
    {
        const response = await fetch('/api/v1/document?page='+page);
        try {
            const {data, meta} = await response.json();
            this.setState({files: data, page: meta.current_page, pages:meta.last_page});
        }
        catch (e) {}
    }
    async storeFile()
    {
        const input = document.querySelector('input[type="file"]');
        const body = new FormData();
        body.append('file', input.files[0]);

        try {
            const response = await fetch('/api/v1/document', {
                method: 'POST',
                body
            });
            const {data} = await response.json();
            console.log(data);
            if (data && data.id) {
                const files = this.state.files;
                files.push(data);
                this.setState({files});
                this.toggleAddForm();
            }
        }
        catch (e) {
            this.showError("Failed to upload")
        }
    }
    showError(text) {
        console.error(text);
    }
    componentDidMount()
    {
        this.loadFiles();
    }
    toggleAddForm() {
        this.setState({
            addModal: !this.state.addModal
        });
    }
    togglePreviewForm(file = {}) {
        this.setState({
            previewModal: !this.state.previewModal,
            preview: file
        });
    }
    _pages( total ) {
        const items = [];
        for(let i=1; i<=total;i++) {
            items.push(i);
        }
        return items;
    }
    render() {
        const {files} = this.state;
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">Pdf Editor</h1>
                    <Button color="danger" onClick={this.toggleAddForm.bind(this)}>Add file</Button>
                </header>
                <div className="container">
                    <div className="row">
                    {files.map(file =>
                        <div className="col-md-3" key={file.id}>
                            <Card>
                                <CardImg top width="100%" src={file.thumb} alt="Card image cap" />
                                <CardBody>
                                    <CardTitle>{file.name}</CardTitle>
                                    <Button onClick={this.togglePreviewForm.bind(this, file)}>Open</Button>
                                </CardBody>
                            </Card>
                        </div>
                    )}
                    </div>
                    <Pagination>
                        {this._pages(this.state.pages).map(page =>
                            <PaginationItem key={page} active={page == this.state.page}>
                                <PaginationLink href="#" onClick={() => this.loadFiles(page)}>
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        )}
                    </Pagination>
                </div>
                <Modal isOpen={this.state.addModal} toggle={this.toggleAddForm.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.toggleAddForm.bind(this)}>Upload PDF</ModalHeader>
                    <ModalBody>
                        <input type="file" name="file"/>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.storeFile.bind(this)}>Upload</Button>
                        <Button color="secondary" onClick={this.toggleAddForm.bind(this)}>Cancel</Button>
                    </ModalFooter>
                </Modal>
                <Modal size="lg" isOpen={this.state.previewModal} toggle={this.togglePreviewForm.bind(this)} className={this.props.className}>
                    <ModalHeader toggle={this.togglePreviewForm.bind(this)}>{this.state.preview.name}</ModalHeader>
                    <ModalBody style={{height: '450px'}}>
                        <object data={this.state.preview.path} type="application/pdf" className="w-100 h-100">
                            <embed src={this.state.preview.path} type="application/pdf"/>
                        </object>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.togglePreviewForm.bind(this)}>Close</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default App;
